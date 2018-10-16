'use strict';
import React, { Component } from 'react';
import Events from './events';
import FileInput from './fileinput';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import RequestHeaders from './request_headers';
import * as actions from '../actions/actionCreators';

const request = remote.require('request');

const mapStateToProps = store => ({
  ...store.server
});

const mapDispatchToProps = dispatch => ({
  setServerPath: (event) => {
    event.persist();
    dispatch(actions.setServerPath(event.target.files[0].path))
  },
  setMethod: (event) => dispatch(actions.setMethod(event.target.value)),
  setURL: (event) => dispatch(actions.setURL(event.target.value)),
});

class Request extends Component {
  constructor(props) {
    super(props);
    // this.handleOnData();
    this.startServer = this.startServer.bind(this);
    this.terminateServer = this.terminateServer.bind(this);
  }

  startServer = (filePath) => {
    ipcRenderer.send('server', filePath);
  }

  terminateServer = () => {
    ipcRenderer.send('terminate', true);
    new Notification('Server terminated');
  }

  // handleOnData = () => {
  //   ipcRenderer.on('child-data', (event, data) => {
  //     console.log(data);
  //   });
  // }

  makeRequest = () => {
    request(this.state, (err, res, body) => {
      const statusCode = res ? res.statusCode : 'No response';
      const result = {
        response: `(${statusCode})`,
        raw: body ? body : '',
        headers: res ? res.headers : [],
        error: err ? JSON.stringify(err, null, 2) : ''
      };

      Events.emit('result', result);

      new Notification(`HTTP response finished: ${statusCode}`)
    });
  }

  // makeRequest = (method, path, body) => {
  //   if(method === 'POST' || method === 'PUT'){
  //     fetch(this.props.)
  //   }
  // }

  render() {

    const {
      setServerPath,
      setMethod, 
      setURL,
      filePath,
      URL, 
      method
    } = this.props;

    return (
      <div className="request">
        <h1>Requests</h1>
        <div className="request-options">
          <FileInput 
            setServerPath={setServerPath}
            terminateServer={this.terminateServer}
            startServer={this.startServer}
            filePath={filePath}
            />
          <div className="form-row">
            <label>URL</label>
            <input
              name="url"
              type="url"
              value={URL}
              onChange={setURL} />
          </div>
          <div className="form-row">
            <label>Method</label>
            <input
              name="method"
              type="text"
              value={method}
              placeholder="GET, POST, PATCH, PUT, DELETE"
              onChange={setMethod} />
          </div>
          <div className="form-row">
            <table className="headers">
              <thead>
                <tr>
                  <th className="name">Header Name</th>
                  <th className="value">Header Value</th>
                </tr>
              </thead>
              <RequestHeaders
                handleAdd={this.handleAdd} />
            </table>
          </div>
          <div className="form-row">
            <a className="btn" onClick={this.makeRequest}>Make request</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);
