import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { authConnection } from '../db/connections';

import Character from './Character';

class Account extends DatabaseEntity {
  static get connection() {
    return authConnection;
  }

  static get tableName() {
    return 'account';
  }

  static get primaryKey() {
    return 'id';
  }

  get name() {
    return this.data.username;
  }

  async characters(args) {
    const query = Character.query.where({ account: this.id });
    return new Collection(query, args);
  }
}

export default Account;
