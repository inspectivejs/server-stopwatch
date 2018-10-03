//////////////////////////////////////////////////////////////////////
// THIS IS OUR SERVER THAT WILL LISTEN FOR CERTAIN EVENTS           //
// AND DO SOME WORK WHEN THESE EVENTS ARE EMITTED BY THE DEV-SERVER //
//                                                                  //
// THIS WILL BE RUN BY ELECTRON'S MAIN PROCESS                      //
//////////////////////////////////////////////////////////////////////

console.log('the top of the file');
const app = require('express')();

//Pass express app into NODE createServer
const server = require('http').createServer(app);
let io = require('socket.io')(server);

app.post('/', (req, res) => {
  res.send('we got it');
});

//Attach socket connection to server
io.sockets.on('connection', (socket) => {

  console.log('\n\nServer2 has connected. Waiting for requests...');

  //Listen for 'REQUEST' event sent from dev server
  socket.on('REQUEST', (msg) => {
    console.log('REQUEST SENT:', JSON.parse(msg) );
  })

  //Listen for 'DATA' event sent from dev server
  socket.on('PTA DATA', (msg) => {
    console.log('PTA DATA',msg);
  })

  //Listen for 'RESPONSE' event sent from dev server
  socket.on('RESPONSE', (msg) => {
    console.log('RESPONSE sent');
  })

  socket.on('POST BODY READY', (msg) => {
    console.log('POST BODY:', msg);
  })

  //Listen for 'CALLSTACK' event sent from dev server
  // socket.on('callstack', (msg) => {
  //   console.log('callstack', msg);
  // })

});

server.listen(3000, () => {
  console.log('Listening on port 3000!!');
})