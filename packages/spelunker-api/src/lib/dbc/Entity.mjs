import MemoryEntity from '../core/memory/Entity.mjs';
import { notImplemented } from '../utils/abstract.mjs';

import DBCQuery from './Query.mjs';

class DBCEntity extends MemoryEntity {
  static get dbc() {
    notImplemented(this, 'dbc');
  }

  static get query() {
    return new DBCQuery(this);
  }
}

export default DBCEntity;
