const { ipcRenderer } = require('electron');

let data;

let validateArray = ['validateUser'];
let time1 = ['time1'];
let rootArray = ['/'];
let time2 = ['time2'];
let originxs = {
  validateUser: "time1",
  '/': "time2",
};

let chart;

ipcRenderer.on('label', (event, arg) => {
  // alert('we got data to multiXY');
  console.log('inside multiXY.js', arg);
  data = arg;


  // loop through the data
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].mark === 'validateUser') {
      validateArray.push(data[i].duration);
      time1.push(data[i].actualTime);
    }
    if (data[i].mark === '/') {
      rootArray.push(data[i].duration);
      time2.push(data[i].actualTime);
    }
  }
  chart.load({
    xs: originxs,
    columns: [
      time1, time2, validateArray, rootArray,
      // ...time1, ...time2,
      // ...validateArray, ...rootArray,
    ],
  });
  // validateArray = ['validateUser'];
  // time1 = ['time1'];
  // rootArray = ['/'];
  // time1 = ['time2'];
});


chart = bb.generate(
  {
    data: {
      xs: {
        // login: "time1",
        // register: "time2",
        validateUser: "time1",
        '/': "time2",
      },
      columns: [
        // ['time1', 1539621091618, 1539621093924, 1539621098535, 1539621103137, 1539621107747, 1539621110052],
        // ['time2', 1539621091618, 1539621093924, 1539621098535, 1539621103137, 1539621107747, 1539621110052],
        // ["login", 30, 200, 100, 400, 150, 250],
        // ["register", 20, 180, 240, 100, 190],
        ['time1'],
        ['time2'],
        ["validateUser"],
        ["/"],
      ],
      xFormat: '%Q',
    },
    axis: {
      x: {
        label: 'millisecond',
        type: 'timeseries',
        tick: {
          width: 100,
          format: (x) => new Date(x).getMilliseconds(),
        },
      },
      y: {
        label: 'milliseconds',
      },
    },
    zoom: {
      enabled: true,
      rescale: true,
    },
  },
);
