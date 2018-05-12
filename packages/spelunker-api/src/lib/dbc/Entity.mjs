import Entity from '../core/Entity';
import { notImplemented } from '../utils/abstract';

import DBCQuery from './Query';

class DBCEntity extends Entity {
  static get dbc() {
    notImplemented(this, 'dbc');
  }

  static get query() {
    return new DBCQuery(this);
  }

  static async find(id) {
    const results = await this.query;
    // TODO: This may not work for all DBC entities
    return results.find(entry => entry.id === id);
  }
}

export default DBCEntity;
