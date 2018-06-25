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
  label: null,
};

const List = (props) => {
  if (!React.Children.toArray(props.children).length) {
    return null;
  }

  const className = classNames(styles.list, props.className);
  return [
    props.label && <h2 key="heading">{props.label}</h2>,
    <ul className={className} key="list">{props.children}</ul>,
  ];
};

export default List;
export { ListItem };
