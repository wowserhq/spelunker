import DBC from 'blizzardry/lib/dbc/entities';
import restructure from 'blizzardry/lib/restructure';

import Query from '../core/Query';
import mpq from '../mpq';
import { dbcLog as log } from '../utils/logger';

const { DecodeStream } = restructure;

const cache = new Map();

class DBCQuery extends Query {
  constructor(entity) {
    super(entity);

    this.id = entity.dbc;
    this.filepath = `DBFilesClient\\${this.id}.dbc`;

    this.offset = 0;
    this.limit = undefined;

    this.results = null;
  }

  slice(offset, limit) {
    this.offset = offset;
    this.limit = limit;
    this.results = null;
    return this;
  }

  async count() {
    const results = await new DBCQuery(this.entity);
    return results.length;
  }

  load() {
    const { id, filepath } = this;

    const file = mpq.files.get(filepath);
    const definition = DBC[id];
    const dbc = definition.dbc.decode(new DecodeStream(file.data));
    const records = this.build(dbc.records);
    log(`pre-loaded ${filepath}`);
    return records;
  }

  then(resolve) {
    let records = cache.get(this.id);
    if (!records) {
      records = this.load();
      cache.set(this.id, records);
    }

    const end = this.limit ? this.offset + this.limit : undefined;
    return resolve(records.slice(this.offset, end));
  }
}

export default DBCQuery;
