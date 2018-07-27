import Entity from '../core/Entity';
import { notImplemented } from '../utils/abstract';

import DatabaseQuery from './Query';

class DatabaseEntity extends Entity {
  static get connection() {
    notImplemented(this, 'connection');
  }

  static get tableName() {
    notImplemented(this, 'tableName');
  }

  static get primaryKey() {
    notImplemented(this, 'primaryKey');
  }

  static get database() {
    return this.connection.client.connectionSettings.database;
  }

  static get fqTableName() {
    return `${this.database}.${this.tableName}`;
  }

  static get query() {
    return new DatabaseQuery(this);
  }

  static fqColumn(column) {
    return `${this.fqTableName}.${column}`;
  }
}

export default DatabaseEntity;
