import React from 'react';
import classNames from 'classnames';

import { isPathBasename } from '../../../utils/pipeline';
import GameImage from '../GameImage';

import styles from './index.styl';

const GameIcon = (props) => {
  let file = props.file;
  if (isPathBasename(file)) {
    file = `interface/icons/${file}`;
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
