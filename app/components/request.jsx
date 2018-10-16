'use strict';
import React, { Component } from 'react';
import FileInput from './fileinput';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import RequestHeaders from './request_headers';
import dataFaker from '../lib/dataFaker'; 
import Editor from './editor';
import * as actions from '../actions/actionCreators';

const mapStateToProps = store => ({
  ...store.server
});

const mapDispatchToProps = dispatch => ({
  setServerPath: (event) => {
    event.persist();
    dispatch(actions.setServerPath(event.target.files[0].path))
  },
  setSchema:  (schema) => dispatch(actions.setSchema(schema)),
  setRequests: (event) => dispatch(actions.setRequests(event.target.value)),
  setMethod:   (event) => dispatch(actions.setMethod(event.target.value)),
  setURL:      (event) => dispatch(actions.setURL(event.target.value)),
  setData:      (data) => dispatch(actions.setData(data)),
});

class Request extends Component {
  constructor(props) {
    super(props);
    this.handleOnData();
    this.startServer = this.startServer.bind(this);
    this.terminateServer = this.terminateServer.bind(this);
  }

  startServer = () => {
    console.log('startServer', this.props.filePath)
    if (!this.props.filePath) {
      return;
    }
    else {
      ipcRenderer.send('server', this.props.filePath);
    }
  }

  terminateServer = () => {
    ipcRenderer.send('terminate', true);
  }

  handleOnData = () => {
    ipcRenderer.on('child-data', (event, data) => {
      console.log('child-data', data);
    });
  }

  makeRequest = () => {
    const { method, headers, schema, requests, URL } = this.props;
    if (!method || !headers || !schema || !requests || !URL) {
      new Notification(new Error('All fields must be filled out'))
    }
    let promises = [];
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      dataFaker(schema, requests, (err, json) => {
        if (err || !URL) {
          new Notification(err)
        } else {
          promises = json.map(data => fetch(URL, {
            method,
            headers,
            body: JSON.stringify(data)
          }));
        }
      })
    } else {
      for (let i = 0; i < requests; i += 1) {
        promises.push(fetch(URL, { method, headers }))
      }
    }
    Promise.all(promises);
  }

  render() {
    const {
      setServerPath,
      setMethod, 
      setURL,
      setSchema,
      setRequests,
      filePath,
      URL, 
      method,
      requests,
      schema
    } = this.props;
 
    return (
      <div className="request">
        <h1>Requests</h1>
        <div className="request-options">
          <FileInput 
            setServerPath={setServerPath}
            terminateServer={this.terminateServer}
            startServer={this.startServer}
            filePath={filePath} />
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
            <select value={method} onChange={setMethod}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
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
              <tbody>
                <tr>
                  {method === 'POST' 
                    ? <Editor 
                        setSchema={setSchema} 
                        schema={schema}/>
                    : ''
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-row">
            <a 
              className="btn" 
              onClick={this.makeRequest} 
              disabled={filePath ? false : true}>Make request</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);
