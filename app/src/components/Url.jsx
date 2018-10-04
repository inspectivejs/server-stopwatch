import React from 'react';
import Dashboard from './containers/dashboard';

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
    // this.setState(state => ({
    //   isToggled: !state.isToggled
    // }), () => {
    //   console.log('CLICKED ISTOGGLED: ', this.state.isToggled);
    // });
    // ipcRenderer.send('port', this.state.port);
  }

  // handleOnMessage() {
  //   ipcRenderer.on('reply', (event, arg) => {
  //     console.log(arg);
  //   });
  // }

  render() {
    console.log(this.state.data);
    // if (this.state.isToggled) {
    //   // redirect to dashboard page
    //   // ipcRenderer.on('sendingJSON', (data) => {
    //   //   console.log('GOT DATA ', data);
    //   // });
    //   return <Dashboard />;
    // }
    return (
      <div>
        <input type="text" onChange={e => this.handleOnChange(e)} value={this.state.port} />
        <input type="submit" value="PORT" onClick={this.handleOnClick} />
      </div>
    );
  }
}

export default Url;
