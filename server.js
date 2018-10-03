/*
 * DEV SERVER
 */

const http = require('http');
const net = require('net');

const stopwatch = require('./lib/connect.js');

// Client's server
const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      switch (req.method) {
        case 'GET':
          res.end('Dummy GET');
          break;
        case 'POST':
          res.end('Dummy POST');
          break;
        default:
          return;
      }
      break;
    default:
      return;
  }
});

stopwatch.connect(8080, server);

server.listen(3000, () => {
  console.log('server started!');
});
