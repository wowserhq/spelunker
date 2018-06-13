import Query from '../core/Query';

class MemoryQuery extends Query {
  constructor(entity, { label, load } = {}) {
    super(entity);

    this.label = label;
    this.log = null;

    this.offset = 0;
    this.limit = undefined;

    this.results = null;
    if (!this.load) {
      this.load = load;
    }
  }

  slice(offset, limit) {
    this.offset = offset;
    this.limit = limit;
    return this;
  }

  async totalCount() {
    if (!this.results) {
      await this.load(this);
    }

    if (this.log) {
      this.log(`counting ${this.label}`);
    }

    return this.results.length;
  }

  async then(resolve) {
    if (!this.results) {
      await this.load(this);
    }

    if (this.log) {
      this.log(`fetching ${this.label}`);
    }

    const end = this.limit ? this.offset + this.limit : undefined;
    resolve(this.results.slice(this.offset, end));
  }

  static for(...args) {
    return new this(...args);
  }
}

export default MemoryQuery;
