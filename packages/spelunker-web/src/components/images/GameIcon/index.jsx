import React from 'react';
import classNames from 'classnames';

import GameImage from '../GameImage';

import styles from './index.styl';

const GameIcon = (props) => {
  let file = props.file;
  if (!file.includes('\\')) {
    file = `Interface\\Icons\\${file}`;
  }
  if (!file.includes('.')) {
    file = `${file}.blp`;
  }

  const className = classNames(
    props.className,
    styles.icon,
    { [styles.asBackground]: props.asBackground },
  );
  return (
    <GameImage
      {...props}
      className={className}
      file={file}
    />
  );
};

export default GameIcon;
