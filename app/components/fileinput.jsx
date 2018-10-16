import React from 'react';

const FileInput = (props) =>(
  <div className="form-row">
    <label>Choose Server</label>
    <input type="file" onChange={props.setServerPath}/>
    <button type="submit" onClick={() => props.startServer(props.filePath)}>Start Server</button>
    <button type="submit" onClick={props.terminateServer}>Terminate Server</button>
  </div>
)

export default FileInput;