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
