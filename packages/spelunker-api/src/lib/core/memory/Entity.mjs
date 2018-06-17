import Entity from '../Entity';
import { notImplemented } from '../../utils/abstract';

import MemoryQuery from './Query';

class MemoryEntity extends Entity {
  static get data() {
    notImplemented(this, 'data');
  }

  static get query() {
    const query = new MemoryQuery(this);
    query.load = async () => {
      let cache = this.cache;
      if (!cache) {
        cache = query.build(this.data);
        this.cache = cache;
      }
      return await cache;
    };
    return query;
  }

  static async find(id) {
    const results = await this.query.execute();
    return results.find(entry => entry.id === id);
  }
}

export default MemoryEntity;
