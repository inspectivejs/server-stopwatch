import React from 'react';
import AceEditor from 'react-ace';

const Editor = (props) => {
  return (
    <div>
      <AceEditor
        value={props.schema}
        onChange={props.setSchema}
        editorProps={{$blockScrolling: true}}
      />
    </div>
  );
};

export default Editor;