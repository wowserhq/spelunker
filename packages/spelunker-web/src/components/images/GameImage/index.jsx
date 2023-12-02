import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { loadBlp, drawBlp } from '../../../utils/blp';
import { toPipelinePath } from '../../../utils/pipeline';

import styles from './index.styl';

const GameImageBackground = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
    const load = async (src, canvas) => {
      const blp = await loadBlp(src);
      drawBlp(blp, canvas);
    };

    if (canvasRef.current) {
      load(props.src, canvasRef.current);
    }
  }, [props.src]);

  const className = classNames(
    props.className,
    styles.image,
    styles.asBackground,
  );

  return (
    <span className={className}>
      <canvas
        ref={canvasRef}
      />
    </span>
  );
};

const GameImageElement = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
    const load = async (src, canvas) => {
      const blp = await loadBlp(src);
      drawBlp(blp, canvas);
    };

    if (canvasRef.current) {
      load(props.src, canvasRef.current);
    }
  }, [props.src]);

  const className = classNames(props.className, styles.image);
  return (
    <canvas
      // TODO: Set proper alt texts for all images
      ref={canvasRef}
      className={className}
    />
  );
};

const GameImage = (props) => {
  const src = `${process.env.DATA_URI}/${toPipelinePath(props.file)}`;

  const Component = props.asBackground ? GameImageBackground : GameImageElement;
  return <Component {...props} src={src} />;
};

export default GameImage;
