import React from 'react';
import classNames from 'classnames';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const RaceIcon = ({ race, gender, size }) => {
  const lookup = `${race.filename.toLowerCase()}-${gender.toLowerCase()}`;
  const style = styles[lookup];
  if (!style) {
    return null;
  }

  const className = classNames(styles.icon, styles[size], style);
  return (
    <GameIcon
      file="Interface/GLUES/CHARACTERCREATE/UI-CharacterCreate-Races.BLP"
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
