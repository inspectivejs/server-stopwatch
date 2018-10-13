const http = require('http');
const express = require('express');
const sw = require('./server-stopwatch');

const app = express();
const stopwatch = new sw();
const server = http.createServer(app);

stopwatch.listen(server, {
  url: '/yes',
  method: 'GET'
});

app.get('/yes', (req, res, next) => {
  next();
}, (req, res) => {
  res.send('you should see this')
})

app.get('/no', (req, res) => {
  res.send('you should not see this');
})


server.listen(8080, () => console.log('listening on port 8080'))