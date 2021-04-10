import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, ContentState, RichUtils } from "draft-js";
import path from 'path';

import css from './style.css';

function PlaintextEditor({ file, write }) {
  console.log(file, write);
  const [value, setValue] = useState('');
  const contentState = ContentState.createFromText(value);
  console.log(value);
  console.log(contentState);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.editor}>
      <h3 className={css.title}>{path.basename(file.name)}</h3>
      <div className={css.content}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
