import React from 'react';
import Button from 'muicss/lib/react/button';

const FileInput = (props) =>(
  <div className="form-row">
    <label id="upload" for="file"><i class="fas fa-3x fa-file-upload"></i></label>
    <input type="file" className="server_path" name="file" id="file" onChange={event => props.setServerPath(event)}/>
    <Button className="s_btn" variant="raised" color="warning" type="submit" onClick={props.startServer}>Start</Button>
    <Button className="t_btn" variant="raised" color="danger" type="submit" onClick={props.terminateServer}>Terminate</Button>
    </div>
    )
    
    // <button type="submit" onClick={props.startServer}>Start Server</button>
export default FileInput;