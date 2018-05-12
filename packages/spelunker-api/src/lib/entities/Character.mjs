import Collection from '../core/Collection.mjs';
import DatabaseEntity from '../db/Entity';
import { characterConnection } from '../db/connections';

import Account from './Account';
import CharacterItem from './CharacterItem';
import Race from './Race.mjs';
import Class from './Class.mjs';

class Character extends DatabaseEntity {
  static get connection() {
    return characterConnection;
  }

  static get tableName() {
    return 'characters';
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

  async account() {
    return Account.find(this.data.account);
  }

  async class() {
    return Class.find(this.data.class);
  }

  async inventory(args) {
    const query = CharacterItem.query.where({ owner_guid: this.id });
    return new Collection(query, args);
  }

  async race() {
    return Race.find(this.data.race);
  }
}

export default Character;
