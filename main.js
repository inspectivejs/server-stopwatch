'use strict';
const electron = require('electron');
const { ipcMain } = require('electron');
const { spawn } = require('child_process');
const { app, BrowserWindow } = electron;

require('electron-reload')(__dirname);
let mainWindow, secondWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  secondWindow = new BrowserWindow({ width: 300, height: 300, parent: mainWindow });
  secondWindow.loadURL(`file://${__dirname}/graph/chart.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
    secondWindow = null;
  });
});


ipcMain.on('server', (event, filePath) => {
  const child = spawn('node', [filePath], {
    stdio: ['ipc'],
  });
  
  child.on('message', data => {
    data = JSON.parse(data.toString());
    console.log('inside main.js', data);
    event.sender.send('child-data', data);
    // event.sender.send('label', data);
    secondWindow.webContents.send('label', data);
  });

  ipcMain.on('terminate', (event, arg) => {
    child.kill();
    console.log('server terminated');
  });
});

// ipcMain.on('request-to-second-window', (event, args) => {
//   secondWindow.webContents.send('label', args);
// });
