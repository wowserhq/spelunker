import React from 'react';

import styles from './index.styl';

const Table = (props) => (
  <table className={styles.table}>
    {props.children}
  </table>
);

export default Table;
