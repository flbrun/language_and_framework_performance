const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const indexPath = path.join(__dirname, 'build', 'index.html');
const scriptsPath = path.join(__dirname, 'scripts');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 800,
        height: 600,
        useContentSize: true,
    });

    initializeWindow(mainWindow);
};

app.on('ready', createWindow);

async function sendScriptsToRenderer(webContents) {
    try {
        const scriptFiles = await fs.promises.readdir(scriptsPath);

        const scriptContents = await Promise.all(
            scriptFiles.map(async (file) => {
                const filePath = path.join(scriptsPath, file);
                const content = await fs.promises.readFile(filePath, 'utf-8');
                return { fileName: file, content };
            })
        );

        webContents.send('script-contents', scriptContents);
    } catch (error) {
        console.error('Error reading script files:', error);
    }
}

ipcMain.handle('script-contents', async (event) => {
    try {
        const scriptFiles = await fs.promises.readdir(scriptsPath);

        const scriptContents = await Promise.all(
            scriptFiles.map(async (file) => {
                const filePath = path.join(scriptsPath, file);
                const content = await fs.promises.readFile(filePath, 'utf-8');
                return { fileName: file, content };
            })
        );

        return scriptContents;
    } catch (error) {
        console.error('Error getting script contents:', error);
        throw error;
    }
});

async function initializeWindow(mainWindow) {
    await mainWindow.loadFile(indexPath);
    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools();
}
