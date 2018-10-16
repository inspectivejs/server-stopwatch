const http = require('http');
const express = require('express');
const sw = require('./server-stopwatch');
const { performance } = require('perf_hooks');
const bodyParser = require('body-parser');

const app = express();
const stopwatch = new sw();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

stopwatch.listen(server, {
  url: '/yes',
  method: 'GET'
});

function validateUser(req, res, next) {
  res.locals.name = req.body.name === 'Ryan' ? 'Hello Ryan' : 'You are not Ryan'
  next();
}

const _validateUser = performance.timerify(validateUser);


app.post('/', (req, res) => {
  console.log('check')
  res.send('check');
})

app.get('/no', (req, res) => {
  const _reverse = performance.timerify(reverse);
  res.send(  _reverse('hello'));
})


server.listen(3000, () => console.log('listening on port 3000'))