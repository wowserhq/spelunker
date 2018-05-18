import React from 'react';

import styles from './index.styl';

const GameImageBackground = (props) => {
  const className = [
    props.className,
    styles.image,
    styles.asBackground,
  ].join(' ');
  return (
    <span className={className}>
      <img
        // TODO: Set proper alt texts for all images
        alt=""
        src={props.src}
      />
    </span>
  );
};

const GameImageElement = (props) => {
  const className = [props.className, styles.image].join(' ');
  return (
    <img
      // TODO: Set proper alt texts for all images
      alt=""
      className={className}
      src={props.src}
    />
  );
};

const GameImage = (props) => {
  const encoded = encodeURIComponent(props.file);
  const src = `${process.env.PIPELINE_URI}/${encoded}.png`;

  const Component = props.asBackground ? GameImageBackground : GameImageElement;
  return <Component {...props} src={src} />;
};

export default GameImage;
