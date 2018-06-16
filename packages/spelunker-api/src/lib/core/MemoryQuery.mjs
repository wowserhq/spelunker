import Query from '../core/Query';

class MemoryQuery extends Query {
  constructor(entity, { label, load } = {}) {
    super(entity);

    this.label = label;
    this.log = null;

    this.offset = 0;
    this.limit = undefined;

    this.filters = [];
    this.results = null;
    if (!this.load) {
      this.load = load;
    }
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

  async filtered() {
    if (!this.results) {
      await this.load(this);
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

  async then(resolve) {
    if (this.log) {
      this.log(`fetching ${this.label}`);
    }

    const results = await this.filtered();
    const end = this.limit ? this.offset + this.limit : undefined;
    resolve(results.slice(this.offset, end));
  }

  static for(...args) {
    return new this(...args);
  }
}

export default MemoryQuery;
