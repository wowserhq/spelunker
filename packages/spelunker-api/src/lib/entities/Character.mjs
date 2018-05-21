import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { charactersConnection } from '../db/connections';

import Account from './Account';
import CharacterItem from './CharacterItem';
import Class from './Class';
import Race from './Race';

class Character extends DatabaseEntity {
  static get connection() {
    return charactersConnection;
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
