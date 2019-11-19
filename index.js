
const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');

let win;


app.on( 'ready', () => {

    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            // preload: path.join(__dirname, 'preload/index.bundle.js')
            preload: path.join(__dirname, 'preload.js')
        },
        // frame: false
    });

    win.loadFile( path.join( __dirname, 'index.html' ) );

    win.webContents.openDevTools();
});



ipcMain.on( "load:website", async (event, path) => {
    win.loadURL( 'https://www.appcues.com/' );
});