import WDT from 'blizzardry/lib/wdt';
import restructure from 'blizzardry/lib/restructure';

import DBCEntity from '../dbc/Entity';
import cache from '../utils/cache';
import mpq from '../mpq';
import { contains } from '../utils/string';

import Area from './Area';
import GameObjectSpawn from './GameObjectSpawn';
import NPCSpawn from './NPCSpawn';

const { DecodeStream } = restructure;

const TILE_COUNT = 64;
const TILE_SIZE = 533.33333;
const CHUNK_SIZE = 33.3333;

class Map extends DBCEntity {
  static get dbc() {
    return 'Map';
  }

  static search(query, searchQuery) {
    query.filter(map => contains(map.name, searchQuery));
  }

  get filename() {
    return this.data.internalName;
  }

  areas() {
    return Area.query.filter(area => (
      area.mapID === this.id &&
      area.parentID === 0
    ));
  }

  bounds() {
    return cache([Map, this.id, 'bounds'], () => {
      const wdt = this.wdt();
      if (wdt.MWMO.size) {
        // TODO: Compute bounds for map with global WMO
        const max = TILE_COUNT * TILE_SIZE;
        return {
          top: max,
          bottom: -max,
          left: max,
          right: -max,
        };
      }

      const horizontal = [];
      const vertical = [];

      wdt.tiles.forEach((tile, index) => {
        if (tile) {
          const tx = (index / TILE_COUNT) | 0;
          const ty = index % TILE_COUNT;
          vertical.push(tx);
          horizontal.push(ty);
        }
      });

      const CENTER = TILE_COUNT / 2;
      return {
        top:    (CENTER - Math.min(...vertical)) * TILE_SIZE,
        bottom: (CENTER - Math.max(...vertical) - 1) * TILE_SIZE,
        left:   (CENTER - Math.min(...horizontal)) * TILE_SIZE,
        right:  (CENTER - Math.max(...horizontal) - 1) * TILE_SIZE,
      };
    });
  }

  npcSpawns() {
    return NPCSpawn.query.where({ map: this.id });
  }

  objectSpawns() {
    return GameObjectSpawn.query.where({ map: this.id });
  }

  wdt() {
    return cache([Map, this.id, 'wdt'], () => {
      const { filename } = this;
      const wdt = `World\\Maps\\${filename}\\${filename}.wdt`;
      const file = mpq.files.get(wdt);

      return WDT.decode(new DecodeStream(file.data));
    });
  }
}

export default Map;
export { CHUNK_SIZE, TILE_COUNT, TILE_SIZE };
