// Development test server
// 1. npm run start [start the application]
// 2. enter port #
// 3. node server.js [start dev test server]
// 4. Postman -> GET/POST
const http = require('http');
const stopwatch = require();

const server = http.createServer((req, res) => {

  //timeouts for testing route performance
  switch(req.url) {
    case '/':
      switch (req.method){
        case 'GET':
          // setTimeout(function(){
          //   res.end('GET');
          // }, 2000);
          break;
        case 'POST':
          // setTimeout(function(){
          //   res.end('POST');
          // }, 2000);
          break;
        default:
          return;
        }
      break;
    default:
      return;
  }
})

stopwatch(server);

server.listen(3000, () => {
  console.log('test server listening on port 3000')
});
