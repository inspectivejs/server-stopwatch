//////////////////////////////////////////////////////////////////
// THIS FILE WILL BE OUR LIBRARY.                               //
// DEVELOPERS WILL REQUIRE THIS FILE INTO THEIR SERVER          //
// AND PASS THEIR SERVER INTO THE CONNECT METHOD.               //
// THE FUNCTION WILL LATCH THE SOCKET ONTO THEIR SERVER         // 
// AND SEND DATA TO OUR APP BASED ON CERTAIN EVENTS             //
// THAT HAPPEN ON THEIR SERVER. THIS LOGIC IS PRE-DEFINED BELOW //
//////////////////////////////////////////////////////////////////


//Bring in socket-io client and connect to our Application 
// TODO: MAKE PORT DYMANIC BASED ON USER INPUT

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000/', {reconnect: true});

const {PerformanceObserver,performance} = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  //EMIT 'DATA' event that will send measure stats to our app
  socket.emit('PTA DATA', items.getEntries()[0].duration);
  performance.clearMarks();
});

obs.observe({
  entryTypes: ['measure']
});

//This IS WHERE THE MAGIC HAPPENS....
//Function that user will run on their app, passing in their server as an argument
function connect(server) {

  //Connect to our app
  socket.on('connect', function (socket) {
    console.log('Connected to NodeTS!');
  });

  //On every request made to their server from their clients.......
  server.on('request', (request, response) => {

    //Emit 'REQUEST' event on every request made to dev server
    socket.emit('REQUEST', JSON.stringify({path: request.path, method: request.method,}));
    //Set first performance mark
    performance.mark('A');

    //BELOW Used for POST request
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      
      if( request.method === 'POST'){
        body = Buffer.concat(body).toString();

        performance.mark('B');
        performance.measure('A to B', 'A', 'B');

        socket.emit('POST BODY', JSON.stringify({
          path: request.path,
          method: request.method,
          body: JSON.parse(body)
        }));
      }     

    })

    //When the response is sent from their server.......
    response.on('finish', (data) => {
      socket.emit('RESPONSE')
    })

  })
  //TODO: FIX THIS BELOW
  // const njstrace = require('njstrace').inject();
}

module.exports = {
  connect
}