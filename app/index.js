'use strict';

import React from 'react';
import store from './store'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Request from './components/request';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Request /> 
        </div>
      </Provider>
    );
  }
}
    
    
ReactDOM.render(<App />, document.getElementById('app'));
