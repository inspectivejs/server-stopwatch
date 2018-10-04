// Development test server
// 1. npm run start [start the application]
// 2. enter port #
// 3. node server.js [start dev test server]
// 4. Postman -> GET/POST
const http = require('http');
const stopwatch = require('./server-stopwatch');

const server = http.createServer((req, res) => {
  // req.on('readable', data => {
  //   performance.mark('/endpoint/start');
  // });
  
  // res.on('finish', data => {
  //   performance.mark('/endpoint/end');
  //   performance.measure('endpoint route', '/endpoint/start', '/endpoint/end');
  // });
  
  //timeouts for testing route performance
  switch(req.url) {
    case '/':
      switch (req.method){
        case 'GET':
          setTimeout(function(){
            res.end('GET');
          }, 5000);
          break;
        case 'POST':
          // setTimeout(function(){
          //   res.end('POST');
          // }, 2000);
          res.end('POST')
          break;
        default:
          return;
        }
      break;
    default:
      return;
  }
});

stopwatch.connect(server, { port: 8080 });

server.listen(3000, () => {
  console.log('test server listening on port 3000')
});
