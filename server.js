const http = require('http');
const net = require('net');

const appServer = http.createServer((req,res) => {});
appServer.listen(8080, () => {
  console.log('application listening on port 8080')
})

const server = http.createServer((req, res) => {
  res.on('finish', data => {
    appServer.emit('data', 'GET from server.js');
  });
  switch(req.url) {
    case '/':
      switch (req.method){
        case 'GET':
          res.end('GET');
          break;
        case 'POST':
          res.end('POST');
          break;
        default:
          return;
      }
      break;
    default:
      return;
  }
})

server.listen(3000, () => {
  console.log('server started!')
});
