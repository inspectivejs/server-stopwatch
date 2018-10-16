'use strict';

import React from 'react';

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleInput(this.fileInput.current.files[0].path)
  }

  render() {
    return (
      <div>
        <div className="form-row">
          <label>SERVER</label>
          <input type="file" ref={this.fileInput}/>
        </div>
        <div className="form-row">
          <button type="submit" onClick={this.handleSubmit}>Start Server</button>
          <button type="submit" onClick={this.props.handleTerminate}>Terminate Server</button>    
        </div>
      </div>
    );
  }
}

export default FileInput;