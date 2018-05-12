import BLP from 'blizzardry/lib/blp';
import express from 'express';
import pngjs from 'pngjs';

import mpq from '../mpq';

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
