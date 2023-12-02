import mpq from '../mpq/index.mjs';
import logger from '../utils/logger.mjs';

const log = logger('minimap');

log('generating tile index');

const file = mpq.files.get('textures\\Minimap\\md5translate.trs');
const source = file.data.toString();
file.close();

// tile directory -> tile name -> content path
const tiles = {};
let tileCount = 0;

for (const line of source.split(/\n|\r\n/)) {
  if (line.startsWith('dir:') || line.trim().length === 0) {
    continue;
  }

  const [tilePath, contentPath] = line.split(/\t+/);
  const tilePathParts = tilePath.split(/[/\\]/);
  const tileDirectory = tilePathParts.slice(0, -1).map((t) => t.toLowerCase()).join('/');
  const tileName = tilePathParts.at(-1).split('.')[0].toLowerCase();

  if (!tiles[tileDirectory]) {
    tiles[tileDirectory] = {};
  }

  tiles[tileDirectory][tileName] = contentPath.toLowerCase();
  tileCount++;
}

log(`tile index contains ${tileCount} tiles`);

export default tiles;
