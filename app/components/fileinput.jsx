import React from 'react';

const FileInput = (props) =>(
  <div className="form-row">
    <label>Choose Server</label>
    <input type="file" onChange={event => props.setServerPath(event)}/>
    <button type="submit" onClick={props.startServer}>Start Server</button>
    <button type="submit" onClick={props.terminateServer}>Terminate Server</button>
  </div>
)

export default FileInput;