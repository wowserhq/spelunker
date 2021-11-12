import React from 'react';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const SideIcon = ({ side }) => (
  <GameIcon
    file={side.icon}
    className={styles.icon}
  />
);

export default SideIcon;
