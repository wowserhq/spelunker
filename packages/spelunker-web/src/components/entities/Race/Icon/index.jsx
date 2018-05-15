import React from 'react';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const RaceIcon = ({ race, gender }) => {
  const lookup = `${race.filename.toLowerCase()}-${gender.toLowerCase()}`;
  const style = styles[lookup];
  if (!style) {
    return null;
  }

  const className = [styles.icon, style].join(' ');
  return (
    <span>
      <GameIcon
        file="Interface\GLUES\CHARACTERCREATE\UI-CharacterCreate-Races.BLP"
        className={className}
        asBackground
      />
    </span>
  );
};

RaceIcon.defaultProps = {
  gender: 'MALE',
};

export default RaceIcon;
