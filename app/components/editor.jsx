import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/json';
import 'brace/theme/github';

const Editor = (props) => {
  return (
    <td><AceEditor
        mode="json"
        theme="github"
        value={props.schema}
        onChange={props.setSchema}
        editorProps={{$blockScrolling: true}}/>
    </td>
  );
};

export default Editor;