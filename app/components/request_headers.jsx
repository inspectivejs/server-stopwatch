import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import AddHeader from './add_headers';
import AddRequests from './add_requests';

const mapStateToProps = store => ({
  headers: store.server.headers
});

const mapDispatchToProps = dispatch => ({
  updateHeader: (event) => {
    dispatch(
      actions.updateHeader(event.target.value, event.target.dataset.headerName)
  )},
  removeHeader: (event) => {
    dispatch(
      actions.removeHeader(event.target.dataset.headerName)
  )}
});

class RequestHeaders extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const headerRows = Object.keys(this.props.headers).map((key, indx) => {
      return (
          <tr key={indx}>
            <td className="name"><label>{key}</label></td>
            <td className="value">
              <input 
                name="method" 
                type="text" value={this.props.headers[key]} 
                data-header-name={key} 
                onChange={this.props.updateHeader} 
                placeholder="Header value" /> 
              <a href="#" 
                className="round-btn" data-header-name={key} 
                onClick={this.props.removeHeader}>&times;</a>
            </td>
          </tr>
        );
      });
      
      return (
        <tbody className="header-body">
          {headerRows}
          <AddHeader />
          <AddRequests />
        </tbody>
      );
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(RequestHeaders);
