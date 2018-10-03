////////////////////////////////////////////////////////////////////////
//            THIS IS THE DEV SERVER (USER SERVER)                    //
//  DEVELOPERS WILL REQUIRE IN OUR LIBRARY AND CALL THE CONNECT       //
//  METHOD, PASSING ALONG THEIR SERVER AS AN ARGUMENT                 //                               //  ONCE LATCHED ON, THEIR SERVER WILL AUTMOTICALLY EMIT EVENTS      //
//  AND RELEVANT DATA BASED ON THOSE EVENTS TO OUT SERVER (THIS LOGIC //
//  IS PRE-DEFINED IN THE CONNECT METHOD)                             //
//  THIS WILL BE RUN BY ELECTRON'S MAIN PROCESS                       //
////////////////////////////////////////////////////////////////////////

const app = require('express')();
const server = require('http').createServer(app);

//HERE IS WHERE THE MAGIC HAPPENS ;)
const NodeTS = require('./lib');
NodeTS.connect(server);

app.get('/', (req, res) => {
  for(let i =0; i < 100000; i++){
    //Do some work
  }
  res.end('end')
});

app.post('/login', (req,res) => {
  res.end('login')
})

server.listen(5000, () => {
  console.log('Listening on port 5000!!');
});