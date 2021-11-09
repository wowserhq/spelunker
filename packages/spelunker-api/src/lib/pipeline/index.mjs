import BLP from 'blizzardry/lib/blp/index.js';
import express from 'express';
import pngjs from 'pngjs';

import minimapTiles from '../mpq/files/MinimapTiles.mjs';
import mpq from '../mpq/index.mjs';

const { PNG } = pngjs;

const pipeline = express();

pipeline.param('resource', (req, res, next, path) => {
  req.resource = mpq.files.get(path);
  if (req.resource) {
    next();

    // Ensure file is closed in StormLib.
    req.resource.close();
  } else {
    const err = new Error('resource not found');
    err.status = 404;
    throw err;
  }
});

// TODO: Client is currently required to convert X/Y to tile X/Y, perhaps the
// pipeline server should do this?
pipeline.get('/minimap/:mapName/:tx/:ty.blp.png', (req, res) => {
  const { mapName, tx, ty } = req.params;
  const index = `${mapName}\\map${tx}_${ty}`;
  const tile = minimapTiles[index];
  if (tile) {
    res.redirect(`${req.baseUrl}/textures\\Minimap\\${tile}.png`);
  } else {
    res.sendStatus(404);
  }
});

pipeline.get('/:resource(*.blp).png', (req, res) => {
  BLP.from(req.resource.data, (blp) => {
    const mipmap = blp.largest;

    const png = new PNG({ width: mipmap.width, height: mipmap.height });
    png.data = mipmap.rgba;

    res.type('image/png');
    png.pack().pipe(res);
  });
});

pipeline.get('/:resource', (req, res) => {
  res.type(req.resource.name);
  res.send(req.resource.data);
});

export default pipeline;
