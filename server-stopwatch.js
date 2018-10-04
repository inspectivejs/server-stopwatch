const net = require('net');
const { PerformanceObserver, performance } = require('perf_hooks');


const ServerStopwatch = {
  connect: function(server, options){
    this.server = server;
    this.port = options.port;
    this.client = new net.Socket();
    this.client.on('error', () => {
      console.log('socket error!')
    });

    const observer = new PerformanceObserver(entries => {
      entries.getEntries().forEach(entry => {

        this.client.connect(this.port, () => {
          const data = JSON.stringify({
            duration: entry.duration,
            name: entry.name,
            startTime: entry.startTime,
            entryType: entry.entryType
          })
          console.log(data);
          this.client.write(data, () => {
            this.client.destroy()
          });

        })
      })
    });
    
    observer.observe({
      entryTypes: ['measure']
    });

    this.server.on('request', (req, res) => {

      req.on('readable', data => {
        performance.mark('/endpoint/start');
      });

      res.on('finish', data => {
        performance.mark('/endpoint/end');
        performance.measure('endpoint route', '/endpoint/start', '/endpoint/end');
      });    
    })
  },
}

module.exports = ServerStopwatch