import DBCEntity from '../dbc/Entity';

import GameObjectSpawn from './GameObjectSpawn';
import NPCSpawn from './NPCSpawn';

class Map extends DBCEntity {
  static get dbc() {
    return 'Map';
  }

  npcSpawns() {
    return NPCSpawn.query.where({ map: this.id });
  }

  objectSpawns() {
    return GameObjectSpawn.query.where({ map: this.id });
  }
}

export default Map;
