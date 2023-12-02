import BLP from 'blizzardry/lib/blp/index.js';
import express from 'express';
import pngjs from 'pngjs';

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
