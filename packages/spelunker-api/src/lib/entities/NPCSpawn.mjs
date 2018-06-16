import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import Map from './Map';
import NPC from './NPC';

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

  map() {
    return Map.find(this.data.map);
  }

  npc() {
    return NPC.find(this.data.id);
  }
}

export default NPCSpawn;
