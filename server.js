// Development test server
// 1. npm run start [start the application]
// 2. enter port #
// 3. node server.js [start dev test server]
// 4. Postman -> GET/POST
const http = require('http');
const stopwatch = require('./serverAnalyzer').stopwatch;
const { performance } = require('perf_hooks');

const server = http.createServer((req, res) => {
  stopwatch(req, res);

  // req.on('readable', () => {
  //   console.log('Route start event in Server', performance.now())
  // });

  // res.on('finish', data => {
  //   console.log('Route end event in Server', performance.now());
  // });


  //timeouts for testing route performance
  switch(req.url) {
    case '/':
      switch (req.method){
        case 'GET':
            res.end('GET route');
          break;
        case 'POST':
            res.end('POST route');
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
  console.log('test server listening on port 3000')
});
