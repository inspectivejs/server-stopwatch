const net = require('net');
const io = require('socket.io-client');

// const {
//   performance,
//   PerformanceObserver
// } = require('perf_hooks');

function connect(port, devServer) {
  console.log('Inside Connect function in connect js');
  const socket = io.connect(`http://localhost:${port}/`, {
    reconnect: true,
  });

  socket.on('connect', (data) => {
    console.log('Connected to StopWatch');
  });

  socket.on('GIVE PORT', () => {
    socket.send('PORT', port);
  });

  devServer.on('request', (req, res) => {
    socket.emit('REQUEST', JSON.stringify({
      path: req.path,
      method: req.method,
    }));
  });
}

module.exports = {
  connect,
}
