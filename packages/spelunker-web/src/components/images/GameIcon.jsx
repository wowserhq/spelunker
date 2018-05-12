import React from 'react';

import GameImage from './GameImage';

const GameIcon = (props) => {
  const file = `Interface\\Icons\\${props.file}.blp`;
  return (
    <GameImage
      {...props}
      file={file}
    />
  );
};

export default GameIcon;
