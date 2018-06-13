import React from 'react';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const ClassIcon = ({ class: klass, size }) => {
  const style = styles[klass.filename.toLowerCase()];
  const className = [styles.icon, styles[size], style].join(' ');
  return (
    <GameIcon
      file="Interface\GLUES\CHARACTERCREATE\UI-CHARACTERCREATE-CLASSES.BLP"
      className={className}
      asBackground
    />
  );
};

ClassIcon.defaultProps = {
  size: 'normal',
};

export default ClassIcon;
