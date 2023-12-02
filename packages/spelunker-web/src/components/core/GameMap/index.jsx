import React, { useState, useEffect } from 'react';
import { CRS, TileLayer, transformation } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import { createLayerComponent } from '@react-leaflet/core';

import 'leaflet/dist/leaflet.css';

import { Box } from '../';

import { drawBlp, loadBlp } from "../../../utils/blp";
import styles from './index.styl';

const CHUNK_SIZE = 33.3333;
const TILE_INDEX = {};
const zoom = 4;

// See: http://en.wikipedia.org/wiki/Coordinate_reference_system
const crs = Object.assign({}, CRS.Simple, {
  transformation: transformation(-1 / CHUNK_SIZE, 0, -1 / CHUNK_SIZE, 0),
  infinity: false,
});

const loadTileIndex = async (tileDirectory) => {
  // Check index cache
  if (TILE_INDEX[tileDirectory]) {
    return;
  }

  const indexResponse = await fetch(`${process.env.MINIMAP_URI}/tiles/${tileDirectory}`);
  const tileIndex = await indexResponse.json();

  // Cache index
  TILE_INDEX[tileDirectory] = tileIndex;
};

const loadTile = async (tileUrl, tile, done) => {
  const blp = await loadBlp(tileUrl);

  if (!blp) {
    done(new Error('invalid blp'), tile);
    return;
  }

  drawBlp(blp, tile);
  done(undefined, tile);
};

class MinimapTileLayer extends TileLayer {
  createTile(coords, done) {
    const tile = document.createElement('canvas');
    const tileUrl = this.getTileUrl(coords);
    loadTile(tileUrl, tile, done);

    return tile;
  }

  getTileUrl({ x, y }) {
    const tx = 32 + x;
    const ty = 32 + y;

    // TODO use real url
    const unknownTileUrl = `${process.env.DATA_URI}/textures/minimap/unknown_${tx}_${ty}.blp`;

    const tileDirectory = this._url;
    if (!tileDirectory) {
      return unknownTileUrl;
    }

    const tileIndex = TILE_INDEX[tileDirectory];
    if (!tileIndex) {
      return unknownTileUrl;
    }

    const contentPath = tileIndex[`map${tx}_${ty}`];
    if (!contentPath) {
      return unknownTileUrl;
    }

    return `${process.env.DATA_URI}/textures/minimap/${contentPath}`;
  }
}

const createMinimapLayer = (props, context) => {
  const instance = new MinimapTileLayer(props.mapName, { ...props });
  if (props.tileDirectory) {
    instance.setUrl(props.tileDirectory);
  }
  return { instance, context };
};

const updateMinimapLayer = (instance, props, prevProps) => {
  if (prevProps.tileDirectory !== props.tileDirectory) {
    if (instance.setUrl) {
      instance.setUrl(props.tileDirectory);
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

  const tileDirectory = filename.toLowerCase();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async (tileDirectory) => {
      try {
        await loadTileIndex(tileDirectory);
        setLoaded(true);
      } catch (error) {
        setLoaded(false);
      }
    };

    if (!loaded) {
      load(tileDirectory);
    }
  }, [tileDirectory, loaded]);

  return (
    <Box className={styles.box}>
      {loaded && (
        <MapContainer
          attributionControl={false}
          bounds={normalizeBounds(bounds || maxBounds)}
          className={styles.map}
          crs={crs}
          maxBounds={normalizeBounds(maxBounds)}
          maxBoundsViscosity={1.0}
        >
          <MinimapLayer
            tileDirectory={tileDirectory}
            minZoom={zoom - 2}
            maxZoom={zoom + 2}
            minNativeZoom={zoom}
            maxNativeZoom={zoom}
          />

          {props.children}
        </MapContainer>
      )}
    </Box>
  );
};

export default GameMap;
export { default as GameMapPin } from './Pin';
