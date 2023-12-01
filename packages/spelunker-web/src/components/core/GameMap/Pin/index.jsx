import React from 'react';
import { DivIcon } from 'leaflet';
import { Marker } from 'react-leaflet';

import styles from './index.styl';

const icon = new DivIcon({
  className: styles.pin,
  iconSize: [9, 9],
});

const Pin = (props) => (
  <Marker
    {...props}
    icon={icon}
    position={[props.x, props.y]}
  />
);

export default Pin;
