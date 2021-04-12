import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import path from 'path';
import css from '../../pages/style.module.css';

export default function Code({ file }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
    Prism.highlightAll();
  }, []);

  return (
    <div className={css.container}>
      <pre className={`language-${path.basename(file.type)}`}>
        <code>{value}</code>
      </pre>
    </div>
  );
}