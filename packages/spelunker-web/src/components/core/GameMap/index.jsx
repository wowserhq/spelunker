import React from 'react';
import { CRS, TileLayer as LeafletTileLayer, transformation } from 'leaflet';
import { GridLayer, Map, withLeaflet } from 'react-leaflet';

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

class MinimapTileLayer extends LeafletTileLayer {
  getTileUrl({ x, y }) {
    const tx = 32 + x;
    const ty = 32 + y;
    const mapName = this._url;
    return `${process.env.PIPELINE_URI}/minimap/${mapName}/${tx}/${ty}.blp.png`;
  }
}

const MinimapLayer = withLeaflet(class extends GridLayer {
  createLeafletElement(props) {
    return new MinimapTileLayer(props.mapName, this.getOptions(props));
  }

  updateLeafletElement(fromProps, toProps) {
    super.updateLeafletElement(fromProps, toProps);
    if (toProps.mapName !== fromProps.mapName) {
      this.leafletElement.setUrl(toProps.mapName);
    }
  }
});

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
      <Map
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
      </Map>
    </Box>
  );
};

export default GameMap;
export { default as GameMapPin } from './Pin';
