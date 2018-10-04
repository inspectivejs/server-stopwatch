import React from 'react';
import Dashboard from './containers/dashboard';

import PerformanceComponent from './presentation/performance';

// const path = require('path');
const { remote } = require('electron');

const net = remote.require('net');

const { ipcRenderer } = require('electron');


class Url extends React.Component {
  constructor() {
    super();
    this.state = {
      port: '',
      isToggled: false,
      data: {},
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange(e) {
    this.setState({ port: e.target.value });
  }

  handleOnClick() {
    // console.log(this.state.port);
    const socketServer = net.createServer((socket) => {
      socket.on('data', (data) => {
        let json = JSON.parse(data.toString());

        this.setState({ data: json });
      });
    }).listen(this.state.port, () => {
      console.log('Listening to PORT: ', this.state.port);
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <input type="text" onChange={e => this.handleOnChange(e)} value={this.state.port} />
        <input type="submit" value="PORT" onClick={this.handleOnClick} />
        <PerformanceComponent data={this.state.data} />
      </div>
    );
  }
}

export default Url;
