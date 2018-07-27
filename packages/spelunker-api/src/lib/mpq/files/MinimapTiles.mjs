import mpq from '../';

const file = mpq.files.get('textures\\Minimap\\md5translate.trs');
const source = file.data.toString();
file.close();

const TILE_MATCHER = /([\w\\]+).blp\t([a-z0-9]+?.blp)/g;

const tiles = {};

let match = null;
while (match = TILE_MATCHER.exec(source)) {
  const [, id, value] = match;
  tiles[id] = value;
}

export default tiles;
