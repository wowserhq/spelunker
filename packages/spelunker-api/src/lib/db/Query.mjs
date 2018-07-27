import knexQueryMethods from 'knex/lib/query/methods';

import Query from '../core/Query';
import logger from '../utils/logger';

const log = logger('db');

class DatabaseQuery extends Query {
  constructor(entity) {
    super(entity);

    this.knex = entity.connection(entity.fqTableName);
  }

  get none() {
    this.whereRaw('1 = 0');
    return this;
  }

  execute() {
    log(this.knex.toString());
    return this.knex.then(results => (
      results && this.build(results)
    )).catch(error => {
      throw error;
    });
  }

  find(id) {
    return this.where({
      [this.entity.primaryKey]: id,
    }).first().execute();
  }

  slice(offset, limit) {
    this.knex.offset(offset);
    if (limit !== Infinity) {
      this.knex.limit(limit);
    }
    return this;
  }

  totalCount() {
    const knex = this.knex.clone().clearSelect().count();
    log(knex.toString());
    return knex.then(results => (
      results[0]['count(*)']
    ));
  }
}

for (const method of knexQueryMethods) {
  if (!DatabaseQuery.prototype[method]) {
    DatabaseQuery.prototype[method] = function (...args) {
      this.knex[method](...args);
      return this;
    };
  }
}

export default DatabaseQuery;
