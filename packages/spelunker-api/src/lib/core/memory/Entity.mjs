import Entity from '../Entity';
import cache from '../../utils/cache';
import { notImplemented } from '../../utils/abstract';

import MemoryQuery from './Query';

class MemoryEntity extends Entity {
  static get data() {
    notImplemented(this, 'data');
  }

  static get query() {
    const query = new MemoryQuery(this);
    query.load = () => (
      cache([this], () => query.build(this.data))
    );
    return query;
  }
}

export default MemoryEntity;
