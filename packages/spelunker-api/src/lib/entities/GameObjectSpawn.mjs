import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import GameObject from './GameObject';
import Map from './Map';

class GameObjectSpawn extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'gameobject';
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

  object() {
    return GameObject.find(this.data.id);
  }
}

export default GameObjectSpawn;
