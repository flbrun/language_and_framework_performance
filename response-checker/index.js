

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
        const {selectedProtocol, serverName, port, endpoint, requestNumber, testKind, parallel} = loadTestOptions;
        const url = `${selectedProtocol}${serverName}:${port}/${endpoint}`;
        console.log(url);
        let responses = [];

        if(loadTestOptions.cpuLoad && (requestNumber > 0)) {
            cpuLoadActive = true;
            cpuLoad(event);
        }

        if (testKind === "parallel") {
            responses = await executeParallelRequests(url, requestNumber, parallel);
        }

        if (testKind === "serial") {
            responses = await executeSerialRequests(url, requestNumber);
        }

        event.sender.send('loadTestResults', responses);
        cpuLoadActive = false;

    }catch (error)
    {
        responses.push({
            responseStatus: "Err",
            responseBody: error.toString(),
            responseHeaders: [{name: "Error", value: error.toString()}],
            duration: ""
        })
        event.sender.send('loadTestResults', responses);
        cpuLoadActive = false;
    }
});

async function executeRequest(url) {
    const startTime = performance.now();
    const response = await fetch(url);
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(1);
    const responseBody = await response.text();
    const responseStatus = response.status;
    const responseHeaders = Array.from(response.headers.entries());
    let header = [];

    for (let [name, value] of responseHeaders) {
        header.push({
            name: name,
            value: value,
        });
    }

    return {
        responseStatus: responseStatus,
        responseBody: responseBody,
        responseHeaders: header,
        duration: duration,
    };
}

async function executeSerialRequests(url, requestNumber) {
    const responses = [];

    for (let i = 0; i < requestNumber; i++) {
        const response = await executeRequest(url);
        responses.push(response);
    }

    return responses;
}

async function executeParallelRequests(url, requestNumber, parallel) {
    const requestPromises = [];
    const responses = [];

    for (let i = 0; i < requestNumber; i++) {
        requestPromises.push(executeRequest(url));

        if (requestPromises.length >= parallel || i === requestNumber - 1) {

            const batchResponses = await Promise.all(requestPromises);

            responses.push(...batchResponses);

            requestPromises.length = 0;
        }
    }

    return responses;
}

async function cpuLoad(event) {
     const cores = (await si.cpu()).cores
    let data = [];

    while (cpuLoadActive) {
        try {
            let sum = 0;
            data[0] = 0;
            for(let i = 0; i<cores; i++)
            {
                data[i+1] = (await si.currentLoad()).cpus[i].load;
                sum += data[i]
            }
            data[0] = sum/cores;
            event.sender.send('cpuLoad', data);
            await new Promise((resolve) => setTimeout(resolve, 300));
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
