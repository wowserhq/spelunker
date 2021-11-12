import React from 'react';
import classNames from 'classnames';

import styles from './index.styl';

const Box = (props) => {
  const className = classNames(
    styles.box,
    props.className,
    { [styles.aside]: props.aside },
  );
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
