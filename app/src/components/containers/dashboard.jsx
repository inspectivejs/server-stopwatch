import React, { Component } from 'react';

const { ipcRenderer } = require('electron');

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handleOnSendJson() {
    ipcRenderer.on('sendJSON', (event, payload) => {
      console.log('i got data');
      this.setState(payload);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="container main frame">
        <div className="title">
          Analysis
        </div>
        <div className="container frame">
          <h2>these stats</h2>
        </div>
      </div>
    );
  }
}

export default Dashboard;
