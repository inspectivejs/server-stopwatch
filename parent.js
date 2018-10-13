const { spawn } = require('child_process');

const child = spawn('node', [ './server.js' ], {
    stdio: ['ipc']
  });
  
child.on('message', data => {
  // data = JSON.parse(data.toString())
  console.log('parent', data);
  // event.sender.send('data', data);
});