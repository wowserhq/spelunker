import React from 'react';
import classNames from 'classnames';

import styles from './index.styl';

const SentenceItem = (props) => {
  const className = classNames(styles.item, props.className, {
    [styles.current]: props.current,
  });
  return (
    <span className={className}>
      {props.children}
    </span>
  );
};

SentenceItem.defaultProps = {
  current: false,
};

const Sentence = (props) => {
  if (!React.Children.toArray(props.children).length) {
    return null;
  }

  const className = classNames(styles.sentence, props.className);
  return (
    <span className={className}>
      {props.children}
    </span>
  );
};

export default Sentence;
export { SentenceItem };
