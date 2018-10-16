import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';

const mapStateToProps = store => ({
  newHeaderName: store.server.newHeaderName,
  newHeaderValue: store.server.newHeaderValue
});

const mapDispatchToProps = dispatch => ({
  setHeaderName: (event) => dispatch(actions.setHeaderName(event.target.value)),
  setHeaderValue: (event) => dispatch(actions.setHeaderValue(event.target.value)),
  addHeader: (key, value) => dispatch(actions.addHeader(key, value))
});

class AddHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className="add">
        <td className="name"><input name="name" type="text" value={this.props.newHeaderName} placeholder="Name" onChange={this.props.setHeaderName}/> </td>
        <td className="value"><input name="value" type="text" value={this.props.newHeaderValue} placeholder="Value" onChange={this.props.setHeaderValue} /> </td>
        <td className="value"><a href="#" className="round-btn" onClick={() => this.props.addHeader(this.props.newHeaderName, this.props.newHeaderValue)}>+</a></td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHeader);