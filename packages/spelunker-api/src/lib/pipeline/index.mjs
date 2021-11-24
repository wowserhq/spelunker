import BLP from 'blizzardry/lib/blp/index.js';
import express from 'express';
import pngjs from 'pngjs';

import minimapTiles from '../mpq/files/MinimapTiles.mjs';
import mpq from '../mpq/index.mjs';

const { PNG } = pngjs;

const toMPQPath = path => path.replace(/\//g, '\\');

const pipeline = express();

pipeline.param('file', (req, res, next, path) => {
  req.file = mpq.files.get(toMPQPath(path));
  if (req.file) {
    next();

    // Ensure file is closed in StormLib.
    req.file.close();
  } else {
    const err = new Error('file not found');
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
    res.redirect(`${req.baseUrl}/files/textures/minimap/${tile}.png`);
  } else {
    res.sendStatus(404);
  }
});

pipeline.get('/files/:file(*.blp).png', (req, res) => {
  BLP.from(req.file.data, (blp) => {
    const mipmap = blp.largest;

    const png = new PNG({ width: mipmap.width, height: mipmap.height });
    png.data = mipmap.rgba;

    res.type('image/png');
    png.pack().pipe(res);
  });
});

pipeline.get('/files/:file', (req, res) => {
  res.type(req.file.name);
  res.send(req.file.data);
});

export default pipeline;
