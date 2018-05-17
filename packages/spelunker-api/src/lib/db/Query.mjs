import knexQueryMethods from 'knex/lib/query/methods';

import Query from '../core/Query';
import { dbLog as log } from '../utils/logger';

class DatabaseQuery extends Query {
  constructor(entity) {
    super(entity);

    this.knex = entity.connection(entity.fqTableName);
  }

  slice(offset, limit) {
    this.knex.offset(offset).limit(limit);
    return this;
  }

  count() {
    const knex = this.knex.clone().count();
    log(knex.toString());
    return knex.then(results => (
      results[0]['count(*)']
    ));
  }

  then(resolve, reject) {
    log(this.knex.toString());
    this.knex.then(results => {
      resolve(results && this.build(results));
    }).catch(reject);
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
