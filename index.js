const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            // preload: path.join(__dirname, 'preload/index.bundle.js')
            preload: path.join(__dirname, 'preload.js')
        },
        // frame: false
    });

    // win.setAutoHideMenuBar( true );
    // win.setMenuBarVisibility( false );

    // and load the index.html of the app.
    win.loadURL( 'https://www.appcues.com/' );




    win.webContents.openDevTools();

    // let view = new BrowserView();
    // win.setBrowserView(view);
    // view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
    // // view.webContents.loadURL('https://electronjs.org')
    // view.webContents.loadURL('https://boardme.app')
}

app.on( 'ready', createWindow );