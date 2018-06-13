import React from 'react';

import styles from './index.styl';

const Box = (props) => {
  const className = [
    styles.box,
    props.aside ? styles.aside : undefined,
    props.className,
  ].join(' ');
  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

Box.defaultProps = {
  aside: false,
};

export default Box;
export { default as Tab } from './Tabbed/Tab';
export { default as TabbedBox } from './Tabbed';
