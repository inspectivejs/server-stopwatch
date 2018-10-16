import React from 'react';
import AceEditor from 'react-ace';

const Editor = (props) => {
  return (
    <td><AceEditor
        value={props.schema}
        onChange={props.setSchema}
        editorProps={{$blockScrolling: true}}/>
    </td>
  );
};

export default Editor;