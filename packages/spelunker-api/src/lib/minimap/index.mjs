import express from 'express';
import tiles from './tiles.mjs';

const minimap = express();

minimap.get('/tiles/*', (req, res) => {
  const directoryName = req.params[0];

  if (!tiles[directoryName]) {
    res.sendStatus(404);
    return;
  }

  res.json(tiles[directoryName]);
});

export default minimap;
