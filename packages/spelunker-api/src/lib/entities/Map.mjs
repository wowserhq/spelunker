import Collection from '../core/Collection';
import DBCEntity from '../dbc/Entity';

import Character from './Character';
import GameObjectSpawn from './GameObjectSpawn';
import NPCSpawn from './NPCSpawn';

class Map extends DBCEntity {
  static get dbc() {
    return 'Map';
  }

  async characters(args) {
    const query = Character.query.where({ map: this.id });
    return new Collection(query, args);
  }

  async npcSpawns(args) {
    const query = NPCSpawn.query.where({ map: this.id });
    return new Collection(query, args);
  }

  async objectSpawns(args) {
    const query = GameObjectSpawn.query.where({ map: this.id });
    return new Collection(query, args);
  }
}

export default Map;
