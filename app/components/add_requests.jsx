import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';

const mapStateToProps = store => ({
  requests: store.server.requests
});

const mapDispatchToProps = dispatch => ({
  setRequests: (event) => {
    dispatch(actions.setRequests(event.target.value))
  },
});

const AddRequests = (props) => {
  return (
    <tr>
      <td>
        <label>Requests: </label>
      </td>
      <td>
        <input
          name="requests"
          type="text"
          value={props.requests || ''} 
          onChange={event => props.setRequests(event)} />
      </td>
    </tr>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRequests);