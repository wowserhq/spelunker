import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import Area from './Area.mjs';
import Map from './Map.mjs';
import NPC from './NPC.mjs';

class NPCSpawn extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'creature';
  }

  static get primaryKey() {
    return 'guid';
  }

  get id() {
    return this.data.guid;
  }

  get x() {
    return this.data.position_x;
  }

  get y() {
    return this.data.position_y;
  }

  get z() {
    return this.data.position_z;
  }

  area() {
    return Area.findByCoords(this.data.map, this.x, this.y, this.z);
  }

  map() {
    return Map.find(this.data.map);
  }

  npc() {
    return NPC.find(this.data.id);
  }
}

export default NPCSpawn;
