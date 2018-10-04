// Basic init
const electron = require('electron');
const { ipcMain } = require('electron');
const http = require('http');
const net = require('net');
const { EventEmitter } = require('events').EventEmitter;
const { app, BrowserWindow } = electron;

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});


// create socket server with user defined port [TODO: path? options?]
// ipcMain.on('port', (event, port) => {
//   const socketServer = net.createServer((socket) => {
//     socket.on('data', function(data) {
//       var json = JSON.parse(data.toString());

//       // handle response from dev server 
//       console.log('main process: ', json);
//       mainWindow.webContents.send('sendJSON', json);
//     });
//   }).listen(port, () => {
//     console.log(`listening on localhost://${port}`);
//   });
// });
