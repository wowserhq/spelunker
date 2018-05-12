import DatabaseEntity from '../db/Entity';
import { characterConnection } from '../db/connections';

import Character from './Character';
import Item from './Item';

class CharacterItem extends DatabaseEntity {
  static get connection() {
    return characterConnection;
  }

  static get tableName() {
    return 'item_instance';
  }

  static get primaryKey() {
    return 'guid';
  }

  get id() {
    return this.data.guid;
  }

  async item() {
    return Item.find(this.data.itemEntry);
  }

  async owner() {
    return Character.find(this.data.owner_guid);
  }
}

export default CharacterItem;
