import Query from '../Query';
import { notImplemented } from '../../utils/abstract';

class MemoryQuery extends Query {
  constructor(entity, { label } = {}) {
    super(entity);

    this.label = label;
    this.log = null;

    this.offset = 0;
    this.limit = undefined;

    this.filters = [];
    this.results = null;
  }

  filter(filter) {
    this.filters.push(filter);
    return this;
  }

  slice(offset, limit) {
    this.offset = offset;
    this.limit = limit;
    return this;
  }

  async load() {
    notImplemented(this, 'load');
  }

  async filtered() {
    if (!this.results) {
      this.results = await this.load();
    }

    if (!this.filters.length) {
      return this.results;
    }

    // TODO: This should probably be cached

    return this.results.filter(result => (
      this.filters.every(filter => filter(result))
    ));
  }

  async totalCount() {
    if (this.log) {
      this.log(`counting ${this.label}`);
    }

    const results = await this.filtered();
    return results.length;
  }

  async execute() {
    if (this.log) {
      this.log(`fetching ${this.label}`);
    }

    const results = await this.filtered();
    const end = this.limit ? this.offset + this.limit : undefined;
    return results.slice(this.offset, end);
  }
}

export default MemoryQuery;
