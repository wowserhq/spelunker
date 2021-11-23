import React from 'react';
import classNames from 'classnames';

import { toPipelinePath } from '../../../utils/pipeline';

import styles from './index.styl';

const GameImageBackground = (props) => {
  const className = classNames(
    props.className,
    styles.image,
    styles.asBackground,
  );
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
  const className = classNames(props.className, styles.image);
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
  const encoded = encodeURI(toPipelinePath(props.file));
  const src = `${process.env.PIPELINE_URI}/${encoded}.png`;

  const Component = props.asBackground ? GameImageBackground : GameImageElement;
  return <Component {...props} src={src} />;
};

export default GameImage;
