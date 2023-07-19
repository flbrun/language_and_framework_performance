

const { app, BrowserWindow, ipcMain } = require('electron');
const fetch = require('electron-fetch').default;

const path = require('path');
const fs = require('fs');
const {wait} = require("@testing-library/user-event/dist/utils");
const si = require('systeminformation');

const indexPath = path.join(__dirname, 'build', 'index.html');
const scriptsPath = path.join(__dirname, 'scripts');
let cpuLoadActive = false;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 1200,
        height: 700,
        useContentSize: true,
        icon: __dirname + 'public/favicon.ico'
    });

    initializeWindow(mainWindow);
};

app.on('ready', createWindow);

ipcMain.handle('script-contents', async (event) => {
    try {
        const scriptFiles = await fs.promises.readdir(scriptsPath);

        return await Promise.all(
            scriptFiles.map(async (file) => {
                const filePath = path.join(scriptsPath, file);
                const content = await fs.promises.readFile(filePath, 'utf-8');
                return {fileName: file, content};
            })
        );
    } catch (error) {
        console.error('Error getting script contents:', error);
        throw error;
    }
});

ipcMain.on('startLoadTest', async (event, loadTestOptions) => {
    const responses = [];
    try {
        const {selectedProtocol, serverName, port, endpoint, requestNumber} = loadTestOptions;
        const url = `${selectedProtocol}${serverName}:${port}/${endpoint}`;

        if(loadTestOptions.cpuLoad && (requestNumber > 0)) {
            cpuLoadActive = true;
            cpuLoad(event);
        }


        for (let i = 0; i < requestNumber; i++) {

            const startTime = performance.now();
            const response = await fetch(url);
            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(1);
            const responseBody = await response.text();
            const responseStatus = response.status;
            const responseHeaders = Array.from(response.headers.entries());
            let header  = [];


            for (let [name, value] of responseHeaders) {
                header.push(
                    {
                        name: name,
                        value: value
                    })
            }

            responses.push({
                responseStatus: responseStatus,
                responseBody: responseBody,
                responseHeaders: header,
                duration: duration
            })

        }

        event.sender.send('loadTestResults', responses);
        cpuLoadActive = false;

    }catch (error)
    {
        responses.push({
            responseStatus: "Err",
            responseBody: error.toString(),
            responseHeaders: "",
            duration: ""
        })
        event.sender.send('loadTestResults', responses);
        cpuLoadActive = false;
    }
});

async function cpuLoad(event) {
    while (cpuLoadActive) {
        try {
            const data = await si.cpuCurrentSpeed();
            event.sender.send('cpuLoad', data.cores);
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
            console.error(error);
        }
    }
}

async function initializeWindow(mainWindow) {
    await mainWindow.loadFile(indexPath);
    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools();
}

try {
    require('electron-reloader')(module)
} catch (_) {}