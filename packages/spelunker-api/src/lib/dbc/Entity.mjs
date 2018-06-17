import MemoryEntity from '../core/memory/Entity';
import { notImplemented } from '../utils/abstract';

import DBCQuery from './Query';

class DBCEntity extends MemoryEntity {
  static get dbc() {
    notImplemented(this, 'dbc');
  }

  static get query() {
    return new DBCQuery(this);
  }
}

export default DBCEntity;
