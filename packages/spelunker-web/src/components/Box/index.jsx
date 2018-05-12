import React from 'react';

import styles from './index.styl';

const Box = (props) => {
  return (
    <div className={styles.box}>
      {props.children}
    </div>
  );
};

export default Box;
export { default as Tab } from './Tabbed/Tab';
export { default as TabbedBox } from './Tabbed';
