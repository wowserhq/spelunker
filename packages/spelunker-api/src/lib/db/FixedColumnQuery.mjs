import MemoryQuery from '../core/memory/Query';
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
    const results = [];
    for (let i = this.start; i <= this.end; ++i) {
      const entry = await this.resolve(i);
      if (entry) {
        results.push(entry);
      }
    }
    return results;
  }
}

export default FixedColumnQuery;
