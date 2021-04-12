import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde.css";
import css from './style.css';

function MarkdownEditor({ file, write }) {
  console.log(file, write);
  const [value, setValue] = useState('');
  const [selectedTab, setSelectedTab] = useState("write");

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.editor}>
      <h3 className={css.title}>{path.basename(file.name)}</h3>
      <div className={css.content}>
        <div className={css.container}>
          <ReactMde
            toolbarCommands={[]}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(<ReactMarkdown source={markdown} />)
            }
          />
        </div>
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
