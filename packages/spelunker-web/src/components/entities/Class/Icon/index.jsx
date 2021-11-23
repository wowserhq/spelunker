import React from 'react';
import classNames from 'classnames';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const ClassIcon = ({ class: klass, size }) => {
  const style = styles[klass.filename.toLowerCase()];
  const className = classNames(styles.icon, styles[size], style);
  return (
    <GameIcon
      file="interface/glues/charactercreate/ui-charactercreate-classes.blp"
      className={className}
      asBackground
    />
  );
};

ClassIcon.defaultProps = {
  size: 'normal',
};

export default ClassIcon;
