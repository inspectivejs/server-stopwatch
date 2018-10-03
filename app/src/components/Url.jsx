import React from 'react';
const { ipcRenderer } = require('electron')

class Url extends React.Component{
  constructor(){
    super();
    this.state = {
      port: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnChange(e){
    this.setState({ port: e.target.value })
  }
  handleOnClick(){
    console.log(this.state.port);
    ipcRenderer.send('port', this.state.port)
  }
  handleOnMessage(){
    ipcRenderer.on('reply', (event, arg) => {
      console.log(arg);
    });
  }

  render(){
    return (
      <div>
        <input type="text" onChange={e => this.handleOnChange(e)} value={this.state.port}/>
        <input type="submit" value="PORT" onClick={this.handleOnClick}/>
      </div>
    )
  }
}

export default Url;