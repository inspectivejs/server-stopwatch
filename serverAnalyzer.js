const http = require('http');
const net = require('net');
const { PerformanceObserver, performance } = require('perf_hooks');

  // Create new socket connection
  const client = new net.Socket();
  client.on('error', () => {
    console.log('socket connection error')
  })

  const observer = new PerformanceObserver(entries => {
    entries.getEntries().forEach(entry => {
      const { duration, name, startTime, entryType } = entry;
      // client.connect(8080, () => {
      //   client.write
        
        console.log(JSON.stringify({
          duration,
          name,
          startTime,
          entryType
        }))
      });
    });

  observer.observe({
    entryTypes: ['measure']
  })

function stopwatch(req, res) {
  req.on('connect', () => {
    console.log(performance.now());
    // console.log('Route start event in Stopwatch', performance.now())
    // performance.mark('/endpoint/start');
  });

  req.on('connection', () => {
    console.log(performance.now());
  })

  req.on('connection', () => {
    console.log(performance.now());
  })

  // res.on('finish', data => {
  //   // console.log('Route end event in Stopwatch', performance.now());
  //   performance.mark('/endpoint/end');
  //   performance.measure('endpoint route', '/endpoint/start', '/endpoint/end');
  // });

}

module.exports = {
  stopwatch
}