import DBCEntity from '../dbc/Entity';
import { contains } from '../utils/string';

import GameObjectSpawn from './GameObjectSpawn';
import NPCSpawn from './NPCSpawn';

class Map extends DBCEntity {
  static get dbc() {
    return 'Map';
  }

  static search(query, searchQuery) {
    query.filter(map => contains(map.name, searchQuery));
  }

  npcSpawns() {
    return NPCSpawn.query.where({ map: this.id });
  }

  objectSpawns() {
    return GameObjectSpawn.query.where({ map: this.id });
  }
}

export default Map;
