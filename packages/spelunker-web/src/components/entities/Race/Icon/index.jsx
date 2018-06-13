import React from 'react';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const RaceIcon = ({ race, gender, size }) => {
  const lookup = `${race.filename.toLowerCase()}-${gender.toLowerCase()}`;
  const style = styles[lookup];
  if (!style) {
    return null;
  }

  const className = [styles.icon, styles[size], style].join(' ');
  return (
    <GameIcon
      file="Interface\GLUES\CHARACTERCREATE\UI-CharacterCreate-Races.BLP"
      className={className}
      asBackground
    />
  );
};

RaceIcon.defaultProps = {
  gender: 'MALE',
  size: 'normal',
};

export default RaceIcon;
