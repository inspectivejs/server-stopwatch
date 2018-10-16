'use strict';

import React from 'react';
import Events from './events';
import RequestHeaders from './request_headers';
import FileInput from './fileinput';
import { ipcRenderer } from 'electron';
import fakeData from './FakeData.js';

const request = remote.require('request');

function ajax(path, method, body, callback){
  const req = {};
  if (method === 'POST' || method === 'DELETE' || method === 'PUT') {
    req.body = JSON.stringify(body);
  }
  req.method = method;
  req.headers = { 'Content-Type' : 'application/json' };
  fetch(path, req).then(res => {
    if (res.status >= 400) {
      return null
    }
    return res.json()
  })
  .then(response => {
    callback(response)
  });
}


class Request extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
      schema: '',
      requests: 0,
      http: {
        url: 'http://localhost:3000',
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Server-Stopwatch',
          'Content-Type': 'application/json'
        },
      }
    };

    this.handleOnData();
    this.handleInput = this.handleInput.bind(this);
    this.handleTerminate = this.handleTerminate.bind(this);
    this.handleSchema = this.handleSchema.bind(this);
  }
  
  handleSchema(schemaString){
    this.setState({ schema: schemaString })
  }

  handleInput = (filePath) => {
    ipcRenderer.send('server', filePath);
  }

  handleTerminate = () => {
    ipcRenderer.send('terminate', true);
    new Notification('Server terminated');
  }

  handleOnData = () => {
    ipcRenderer.on('child-data', (event, data) => {
      console.log(data);
    });
  }

  makeRequest = () => {
    console.log(this.state)
    fakeData(this.state.schema, this.state.requests, (err, json) => {

      if(err){
        new Notification(err)
      } else {
        const requests = json.map(data => fetch(this.state.filePath, {
          method: 'POST',
          headers: this.state.http.headers,
          body: JSON.stringify(data)
        }));

        Promise.all(requests)
        .then(responses => responses.map(res => {
          if (res.status >= 400) return null;
          return res.json()
        }))
        .then(responses => {
          console.log('check', responses);
        }).catch(err => {
          console.log('catch', err);
        })

        // json.forEach(data => {
        //   request(this.state.http, (err, res, body) => {
        //     const statusCode = res ? res.statusCode : 'No response';
        //     const result = {
        //       response: `(${statusCode})`,
        //       raw: body ? body : '',
        //       headers: res ? res.headers : [],
        //       error: err ? JSON.stringify(err, null, 2) : ''
        //     };
        //     Events.emit('result', result);
        //     new Notification(`HTTP response finished: ${statusCode}`)
        //   });
        // })
      }
    })
  }

  handleAdd = (header) => {
    const headers = this.state.http.headers;
    headers[header.name] = header.value;
    this.setState({ http: {...headers} });
  }

  handleChange = (e) => {
    this.setState({ http: {...this.state.http, [e.target.name]: e.target.value }})
  }

  handleChangeHeader = (e) => {
    const key = e.target.dataset.headerName;
    const headers = this.state.http.headers;
    headers[key] = e.target.value;
    this.setState({ headers: headers });
  }

  handleRemoveHeader = (e) => {
    e.preventDefault();
    const key = e.target.dataset.headerName;
    const headers = this.state.http.headers;
    delete headers[key];
    this.setState({ headers: headers });
  }

  handleChangeRequests = (e) => {
    e.preventDefault();
    this.setState({ requests: e.target.value })
  }

  render() {
    return (
      <div className="request">
        <h1>Request</h1>
        <div className="request-options">
          <FileInput 
            handleInput={this.handleInput}
            handleTerminate={this.handleTerminate} />
          <div className="form-row">
            <label>URL</label>
            <input
              name="url"
              type="url"
              value={this.state.http.url}
              onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <label>Method</label>
            <input
              name="method"
              type="text"
              value={this.state.http.method}
              onChange={this.handleChange} 
              placeholder="GET, POST, PATCH, PUT, DELETE" />
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
                headers={this.state.http.headers}
                requests={this.state.requests}
                handleSchema={this.handleSchema}
                handleChangeHeader={this.handleChangeHeader}
                handleRemoveHeader={this.handleRemove}
                handleChangeRequests={this.handleChangeRequests}
                handleAdd={this.handleAdd}
                schema={this.state.schema} />
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

export default Request;
