import React from 'react';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const SideIcon = ({ side }) => {
  const className = [styles.icon].join(' ');
  return (
    <GameIcon
      file={side.icon}
      className={className}
    />
  );
};

export default SideIcon;
