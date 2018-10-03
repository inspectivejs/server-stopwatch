// Basic init
const electron = require('electron');
const { ipcMain } = require('electron');
const http = require('http');
const net = require('net');
const { app, BrowserWindow } = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {

    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)

})

ipcMain.on('port', (event, port) => {
  http.createServer(port, (req, res) => {
    res.on('')
  })
});
