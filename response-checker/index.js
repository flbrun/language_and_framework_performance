const { app, BrowserWindow } = require('electron');
const path = require('path');



const createWindow = () => {

    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 800,
        height: 600,
        useContentSize: true,

    });
    mainWindow.loadFile(`${app.getAppPath()}\\build\\index.html`);
    mainWindow.setMenu(null);
}

app.on('ready', createWindow);