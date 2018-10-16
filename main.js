'use strict';
const electron = require('electron');
const { ipcMain } = require('electron');
const { spawn } = require('child_process');
const { app, BrowserWindow } = electron;

require('electron-reload')(__dirname);
let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.on('server', (event, filePath) => {
  const child = spawn('node', [filePath], {
    stdio: ['ipc'],
  });
  
  child.on('message', data => {
    data = JSON.parse(data.toString());
    console.log(data);
    event.sender.send('child-data', data);
  });

  ipcMain.on('terminate', (event, arg) => {
    child.kill();
    console.log('server terminated');
  });
});
