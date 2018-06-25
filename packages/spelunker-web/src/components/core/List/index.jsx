import React from 'react';
import classNames from 'classnames';

import styles from './index.styl';

const ListItem = (props) => {
  const className = classNames(styles.item, props.className, {
    [styles.current]: props.current,
  });
  return (
    <li className={className}>
      {props.children}
    </li>
  );
};

ListItem.defaultProps = {
  current: false,
};

const List = (props) => {
  const className = classNames(styles.list, props.className);
  return (
    <ul className={className}>
      {props.children}
    </ul>
  );
};

export default List;
export { ListItem };
