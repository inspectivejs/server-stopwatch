// Basic init
const electron = require('electron');
const { ipcMain } = require('electron');
const http = require('http');
const net = require('net');
const { app, BrowserWindow } = electron;


// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;
// let port = 8080;

// application renders when ready
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
  });
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

const server = http.createServer((req, res) => {
  res.end('Welcome to Main Process');
});

const io = require('socket.io')(server);
// const { finalPort } = require('./lib/connect.js');


// setInterval(() => {
//   if (port) {
//     clearInterval();
//   }
// }, 3000);

// Event Emitter listening to port
ipcMain.on('port', (event, port) => {
  console.log('ipcMain: ', port);
  io.sockets.on('connection', (socket) => {
    // socket.on('PORT', (data) => {
    //   console.log('socket PORT', data);
    //   port = data;
    // });

    console.log('\n\nServer2 has connected. Waiting for requests...');

    // Listen for 'REQUEST' event sent from dev server
    socket.on('REQUEST', (msg) => {
      console.log('REQUEST SENT:', JSON.parse(msg));
    });

    // Listen for 'DATA' event sent from dev server
    socket.on('PTA DATA', (msg) => {
      console.log('PTA DATA', msg);
    });

    // Listen for 'RESPONSE' event sent from dev server
    socket.on('RESPONSE', (msg) => {
      console.log('RESPONSE sent');
    });

    socket.on('POST BODY READY', (msg) => {
      console.log('POST BODY:', msg);
    });

    // Listen for 'CALLSTACK' event sent from dev server
    // socket.on('callstack', (msg) => {
    //   console.log('callstack', msg);
    // })
  });


  server.listen(port, () => {
    console.log('Main Process Server on PORT ', port);
  });
});
