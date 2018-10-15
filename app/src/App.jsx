import React, { Component } from 'react';
import { render } from 'react-dom';
import Url from './components/Url';
import Logo from './components/Logo/';
import Link from './components/Link/';
import { setPriority } from 'os';

import Dashboard from './components/containers/dashboard';

export default class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isToggled: false,
  //   };
  // }

  render() {
    return (
      <div>
        <Url />
        {/* <Dashboard /> */}
      </div>
    );
  }
}
