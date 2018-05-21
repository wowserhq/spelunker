import Query from '../core/Query';
import logger from '../utils/logger';

const log = logger('db:fcq');

class FixedColumnQuery extends Query {
  constructor({ label, start = 1, end, resolve }) {
    super(null);

    this.label = label;
    this.start = start,
    this.end = end;
    this.resolve = resolve;

    this.offset = 0;
    this.limit = undefined;

    this.results = null;
  }

  slice(offset, limit) {
    this.offset = offset;
    this.limit = limit;
    return this;
  }

  async count() {
    log(`counting ${this.label}`);
    const results = await this;
    return results.length;
  }

  then(resolve) {
    if (!this.results) {
      log(`fetching ${this.label}`);

      this.results = [];
      for (let i = this.start; i <= this.end; ++i) {
        const entry = this.resolve(i);
        if (entry) {
          this.results.push(entry);
        }
      }
    }

    const end = this.limit ? this.offset + this.limit : undefined;
    resolve(this.results.slice(this.offset, end));
  }

  static for(...args) {
    return new this(...args);
  }
}

export default FixedColumnQuery;
