import { notImplemented } from '../utils/abstract';

class Query {
  constructor(entity) {
    this.entity = entity;
  }

  slice() {
    notImplemented(this, 'slice');
  }

  totalCount() {
    notImplemented(this, 'totalCount');
  }

  then() {
    notImplemented(this, 'then');
  }

  async build(data) {
    if (Array.isArray(data)) {
      const results = [];
      for (const item of data) {
        results.push(await this.build(item));
      }
      return results;
    }

    return this.entity.build(data);
  }
}

export default Query;
