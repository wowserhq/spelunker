import React from 'react';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const ClassIcon = ({ class: klass }) => {
  const style = styles[klass.filename.toLowerCase()];
  const className = [styles.icon, style].join(' ');
  return (
    <GameIcon
      file="Interface\GLUES\CHARACTERCREATE\UI-CHARACTERCREATE-CLASSES.BLP"
      className={className}
      asBackground
    />
  );
};

export default ClassIcon;
