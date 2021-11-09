import Entity from '../Entity.mjs';
import cache from '../../utils/cache.mjs';
import { notImplemented } from '../../utils/abstract.mjs';

import MemoryQuery from './Query.mjs';

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
