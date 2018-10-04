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

// create socket server with user defined port [TODO: path? options?]
ipcMain.on('port', (event, port) => {
  const socketServer = net.createServer(socket => {
    socket.on('data', function(data) {
      const perfObj = JSON.parse(data);

      console.log('Performance Data:\n', perfObj);

      // handle response from dev server 
      
    });
  }).listen(port, () => {
    console.log(`listening on localhost://${port}`)
  })
});
