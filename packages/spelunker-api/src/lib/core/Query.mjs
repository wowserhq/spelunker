import { notImplemented } from '../utils/abstract.mjs';

class Query {
  constructor(entity) {
    this.entity = entity;
  }

  execute() {
    notImplemented(this, 'execute');
  }

  find() {
    notImplemented(this, 'find');
  }

  search(searchQuery) {
    if (searchQuery) {
      this.entity.search(this, searchQuery);
    }
    return this;
  }

  filter(filters) {
    if (filters) {
      this.entity.filter(this, filters);
    }
    return this;
  }

  slice() {
    notImplemented(this, 'slice');
  }

  totalCount() {
    notImplemented(this, 'totalCount');
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
