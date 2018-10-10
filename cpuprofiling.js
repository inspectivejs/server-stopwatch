const profiler = require('inspector');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

profiler.

function snapshotPM2() {
  const session = new profiler.Session();
  session.connect();
  session.post('HeapProfiler.enable');

  const chunks = [];
  session.on('HeapProfiler.addHeapSnapshotChunk', (data) => {
    chunks.push(data.params.chunk);
  });

  session.post('HeapProfiler.takeHeapSnapshot', (err, data) => {
    if (err) return err;
  });

  let file = path.join(process.cwd(), moment().format('dd-HH:mm:ss') + '.heapsnapshot');

  fs.writeFile(file, chunks.join(''), function() {
    session.post('Profiler.disable');
    session.disconnect();
  });
}


// snapshotPM2(file, null);
snapshotPM2();