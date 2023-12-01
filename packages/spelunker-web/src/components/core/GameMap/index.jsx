import React from 'react';
import { CRS, TileLayer, transformation } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import { createLayerComponent } from '@react-leaflet/core';

import 'leaflet/dist/leaflet.css';

import { Box } from '../';

import styles from './index.styl';

const CHUNK_SIZE = 33.3333;
const zoom = 4;

// See: http://en.wikipedia.org/wiki/Coordinate_reference_system
const crs = Object.assign({}, CRS.Simple, {
  transformation: transformation(-1 / CHUNK_SIZE, 0, -1 / CHUNK_SIZE, 0),
  infinity: false,
});

class MinimapTileLayer extends TileLayer {
  getTileUrl({ x, y }) {
    const tx = 32 + x;
    const ty = 32 + y;
    const mapName = this._url;
    return `${process.env.PIPELINE_URI}/minimap/${mapName}/${tx}/${ty}.blp.png`;
  }
}

const createMinimapLayer = (props, context) => {
  const instance = new MinimapTileLayer(props.mapName, { ...props });
  return { instance, context };
};

const updateMinimapLayer = (instance, props, prevProps) => {
  if (prevProps.mapName !== props.mapName) {
    if (instance.setUrl) {
      instance.setUrl(props.mapName);
    }
  }
};

const MinimapLayer = createLayerComponent(createMinimapLayer, updateMinimapLayer);

const normalizeBounds = (bounds) => {
  if (bounds instanceof Array) {
    return bounds;
  }
  return [
    [bounds.top, bounds.left],
    [bounds.bottom, bounds.right],
  ];
};

const GameMap = (props) => {
  const {
    bounds,
    map: {
      filename,
      bounds: maxBounds,
    },
  } = props;

  return (
    <Box className={styles.box}>
      <MapContainer
        attributionControl={false}
        bounds={normalizeBounds(bounds || maxBounds)}
        className={styles.map}
        crs={crs}
        maxBounds={normalizeBounds(maxBounds)}
        maxBoundsViscosity={1.0}
      >
        <MinimapLayer
          mapName={filename}
          minZoom={zoom - 2}
          maxZoom={zoom + 2}
          minNativeZoom={zoom}
          maxNativeZoom={zoom}
        />

        {props.children}
      </MapContainer>
    </Box>
  );
};

export default GameMap;
export { default as GameMapPin } from './Pin';
