import DatabaseEntity from '../db/Entity.mjs';
import { authConnection } from '../db/connections.mjs';

import Character from './Character.mjs';

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

  static search(query, searchQuery) {
    query.where('username', 'LIKE', `%${searchQuery}%`);
  }

  get name() {
    return this.data.username;
  }

  characters() {
    return Character.query.where({ account: this.id });
  }
}

export default Account;
