import React, { useEffect, useRef } from 'react';
import { Blp, BLP_IMAGE_FORMAT } from '@wowserhq/format';
import classNames from 'classnames';

import { toPipelinePath } from '../../../utils/pipeline';

import styles from './index.styl';

const loadBlp = async (canvas, src) => {
  const blpResponse = await fetch(src);
  const blpData = await blpResponse.arrayBuffer();
  const blp = new Blp();
  blp.load(new Uint8Array(blpData));

  const image = blp.getImage(0, BLP_IMAGE_FORMAT.IMAGE_RGBA8888);
  const imageData = new ImageData(new Uint8ClampedArray(image.data), image.width, image.height);

  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d');
  context.putImageData(imageData, 0, 0);
};

const GameImageBackground = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      loadBlp(canvasRef.current, props.src);
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
    if (canvasRef.current) {
      loadBlp(canvasRef.current, props.src);
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
