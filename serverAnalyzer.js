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
    client.connect(8080, () => {
      client.write(JSON.stringify({
        duration,
        name,
        startTime,
        entryType
      }));
    });
  })
});

observer.observe({
  entryTypes: ['measure']
})

req.on('readable', data => {
  performance.mark('/endpoint/start');
});

res.on('finish', data => {
  performance.mark('/endpoint/end');
  performance.measure('endpoint route', '/endpoint/start', '/endpoint/end');
});

function stopwatch(server) {
  
}

module.exports = {
  stopwatch: stopwatch
}