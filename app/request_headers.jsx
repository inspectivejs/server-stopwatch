'use strict';

import React, { Component } from 'react';
import Editor from './Editor';

class RequestHeaders extends Component {
  render() {
    const headers = this.props.headers || {};
    const headerRows = Object.keys(headers).map((key, i) => {
      return (
        <tr key={i}>
          <td className="name"><label>{key}</label></td>
          <td className="value">
            <input 
              name="method" 
              type="text"
              data-header-name={key} 
              value={headers[key]}  
              onChange={this.props.handleChangeHeader} 
              placeholder="Header value" /> 
            <a href="#" 
              className="round-btn" data-header-name={key}
              onClick={this.props.handleRemove}>&times;</a>
          </td>
        </tr>
      );
    });

    return (
      <tbody className="header-body">
        {headerRows}
        <td className="requests">
        </td>
        <input
          name="requests"
          type="text"
          value={this.props.requests} 
          onChange={this.props.handleChangeRequests}
        />
        <Editor 
          handleSchema={this.props.handleSchema} 
          schema={this.props.schema} />
      </tbody>
    );
  }
}

export default RequestHeaders;
