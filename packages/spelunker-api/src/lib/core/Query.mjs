import { notImplemented } from '../utils/abstract';

class Query {
  constructor(entity) {
    this.entity = entity;
  }

  get none() {
    notImplemented(this, 'none');
  }

  search(searchQuery) {
    if (searchQuery) {
      this.entity.search(this, searchQuery);
    }
    return this;
  }

  slice() {
    notImplemented(this, 'slice');
  }

  totalCount() {
    notImplemented(this, 'totalCount');
  }

  execute() {
    notImplemented(this, 'execute');
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
