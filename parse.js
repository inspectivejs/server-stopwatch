const fs = require('fs');
const net = require('net');
const inspector = require('inspector');
const session = new inspector.Session();
const socket = new net.Socket();

session.connect();
// socket.connect({ port: 8080 });

session.post('Profiler.enable', () => {
  session.post('Profiler.start', () => {

    setTimeout(() => {
      session.post('Profiler.stop', (err, profile) => {
        if (!err) {
          console.log(profile)
          // fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
        }
      });
    }, 4000);
  });
});

let content = fs.readFileSync('./profile.cpuprofile', { encoding: 'utf-8' });

console.log(JSON.parse(content));
// const profiler = require('inspector');

// fs.readFileSync('./CPU-20181008T152003.cpuprofile');
// const Profile = require('cpuprofile').Profile;

// let content = fs.readFileSync('./CPU-20181008T152003.cpuprofile', { encoding: 'utf-8' });
// let content = fs.readFile('./CPU-20181008T152003.cpuprofile', {
//   encoding: 'utf-8'
// }, (err, data) => {
//   console.log(data);
// })
// let parsed = JSON.parse(content);

// let profile = Profile.createFromObject(parsed);

// let output = profile.formattedBottomUpProfile();

// console.log(output);
