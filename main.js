'use strict';
const electron = require('electron');
const { ipcMain } = require('electron');
const { spawn } = require('child_process');
const {app, BrowserWindow} = electron; 

require('electron-reload')(__dirname);


// Report crashes to our server.
// electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1024, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.


  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  
});

ipcMain.on('server', (event, filePath) => {
  const child = spawn('node', [ filePath ], {
    stdio: ['ipc']
  });
  
  child.on('message', data => {
    data = JSON.parse(data.toString())
    event.sender.send('child-data', data);
  });
});

ipcMain.on('terminate', (event, arg) => {
  child.kill();
})
