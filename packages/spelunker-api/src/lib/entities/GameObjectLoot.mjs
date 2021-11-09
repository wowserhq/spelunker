import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import GameObject from './GameObject.mjs';
import Item from './Item.mjs';

class GameObjectLoot extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'gameobject_loot_template';
  }

  get chance() {
    return this.data.Chance;
  }

  item() {
    return Item.find(this.data.Item);
  }

  object() {
    return GameObject.find(this.data.Entry);
  }
}

export default GameObjectLoot;
