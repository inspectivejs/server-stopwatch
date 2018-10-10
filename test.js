const net = require('net');

const socket = new net.Socket();

socket.connect({ port: 8080 }, () => {
  console.log('connected on port 8080')
})

socket.on('error', err => console.log(err));

socket.on('data', data => {
  console.log(data);
})