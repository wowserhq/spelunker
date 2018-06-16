import MemoryQuery from '../core/MemoryQuery';
import logger from '../utils/logger';

const log = logger('db:fcq');

class FixedColumnQuery extends MemoryQuery {
  constructor(entity, { label, start = 1, end, resolve }) {
    super(entity, { label });

    this.start = start;
    this.end = end;
    this.resolve = resolve;

    this.log = log;
  }

  async load() {
    this.results = [];
    for (let i = this.start; i <= this.end; ++i) {
      const entry = await this.resolve(i);
      if (entry) {
        this.results.push(entry);
      }
    }
  }
}

export default FixedColumnQuery;
