import React from 'react';

import GameImage from '../GameImage';

import styles from './index.styl';

const GameIcon = (props) => {
  let file = props.file;
  if (!file.includes('.')) {
    file = `Interface\\Icons\\${props.file}.blp`;
  }

  const className = [
    props.className,
    styles.icon,
    props.asBackground ? styles.asBackground : undefined,
  ].join(' ');
  return (
    <GameImage
      {...props}
      className={className}
      file={file}
    />
  );
};

export default GameIcon;
