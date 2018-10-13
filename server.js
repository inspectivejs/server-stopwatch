const http = require('http');
const express = require('express');
const sw = require('./server-stopwatch');

const app = express();
const stopwatch = new sw();
const server = http.createServer(app);

stopwatch.listen(server, {
  url: '/registered',
  method: 'GET'
});

app.get('/', (req, res) => {
  res.send('you should see this')
})

app.post('/', (req, res) => {
  const data = { req}
  res.send('you should not see this');
})


server.listen(8080, () => console.log('listening on port 8080'))