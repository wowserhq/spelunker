import React from 'react';

import styles from './index.styl';

const GameImage = (props) => {
  const encoded = encodeURIComponent(props.file);
  const src = `${process.env.PIPELINE_URI}/${encoded}.png`;

  const className = [props.className, styles.image].join(' ');
  return (
    <img
      // TODO: Set proper alt texts for all images
      alt=""
      className={className}
      src={src}
    />
  );
};

export default GameImage;
