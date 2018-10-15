'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Request from './components/request';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Request />
        
        </div>
        );
      }
    }
    
    
ReactDOM.render(<App />, document.getElementById('app'));
