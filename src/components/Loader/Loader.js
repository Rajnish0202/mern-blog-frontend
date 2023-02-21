import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Loader.module.css';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.loading}>
      <div></div>
    </div>,
    document.getElementById('loader')
  );
};

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div></div>
    </div>
  );
};

export default Loader;
