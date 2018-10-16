'use strict';

import React, { Component } from 'react';
import Editor from './Editor';

class AddHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { name: null, value: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({ name: e.target.value });
      break;

      case 'value':
        this.setState({ value: e.target.value });
      break;
    }
  }
  
  handleAdd(e) {
    e.preventDefault();
    this.props.handleAdd(this.state);
    this.setState({ name: null, value: null });
  }

  render() {
    return (
      <div>
        {/* <tr className="add">
          <td className="name"><input name="name" type="text" value={this.state.name} placeholder="Name" onChange={this.handleChange} /> </td>
          <td className="value"><input name="value" type="text" value={this.state.value} placeholder="Value" onChange={this.handleChange} /> </td>
          <td className="value"><a href="#" className="round-btn" onClick={this.handleAdd}>+</a></td>
        </tr> */}
        <Editor handleSchema={this.props.handleSchema}/>
      </div>
    );
  }
}

export default AddHeader;