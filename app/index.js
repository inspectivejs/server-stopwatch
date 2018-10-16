'use strict';

import React from 'react';
import store from './store'
import ReactDOM from 'react-dom';
import Nav from './components/nav.jsx';
import { Provider } from 'react-redux';
import Request from './components/request';
import { HashRouter } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className='parent_div'>
            <Nav />
            <Request />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
    
    
ReactDOM.render(<App />, document.getElementById('app'));
