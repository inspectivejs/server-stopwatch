const { performance, PerformanceObserver } = require('perf_hooks');

function StopWatch () {

  const observer = new PerformanceObserver(items => {
    const entries = items.getEntries().map(entry => {
      return {
        mark: entry.name,
        timeOrigin: performance.timeOrigin,
        startTime: entry.startTime,
        duration: entry.duration
      }
    });
    process.send(JSON.stringify(entries));
    performance.clearMarks();
  });

  observer.observe({ entryTypes: ['measure', 'function'], buffered: true })
  
  this.listen = (server, config) => {
    this.server = server;
    const opts = config || {};
    
    this.server.on('request', (req, res) => {
      opts.markIds = {
        MARK_START: req.method.concat(req.url).concat('START'),
        MARK_END: req.method.concat(req.url).concat('END'),
        MARK_MEASURE: req.url
      }
      performance.mark(opts.markIds.MARK_START);

      res.on('finish', () => {
        const { MARK_START, MARK_END, MARK_MEASURE } = opts.markIds;
        performance.mark(MARK_END);
        performance.measure(MARK_MEASURE, MARK_START, MARK_END);
      });  
    })
  };

}

module.exports = StopWatch