import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import GameObject from './GameObject';
import Item from './Item';

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

  async item() {
    return Item.find(this.data.Item);
  }

  async object() {
    return GameObject.find(this.data.Entry);
  }
}

export default GameObjectLoot;
