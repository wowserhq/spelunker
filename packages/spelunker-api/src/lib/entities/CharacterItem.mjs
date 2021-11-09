import DatabaseEntity from '../db/Entity.mjs';
import { charactersConnection } from '../db/connections.mjs';

import Character from './Character.mjs';
import Item from './Item.mjs';

class CharacterItem extends DatabaseEntity {
  static get connection() {
    return charactersConnection;
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

  item() {
    return Item.find(this.data.itemEntry);
  }

  owner() {
    return Character.find(this.data.owner_guid);
  }
}

export default CharacterItem;
