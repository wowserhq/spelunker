import DBC from 'blizzardry/lib/dbc/entities';
import restructure from 'blizzardry/lib/restructure';

import MemoryQuery from '../core/MemoryQuery';
import logger from '../utils/logger';
import mpq from '../mpq';

const { DecodeStream } = restructure;

const log = logger('dbc');

const cache = new Map();

class DBCQuery extends MemoryQuery {
  constructor(entity) {
    super(entity);

    this.id = entity.dbc;
    this.filepath = `DBFilesClient\\${this.id}.dbc`;
  }

  async preload() {
    const { id, filepath } = this;

    const file = mpq.files.get(filepath);
    const definition = DBC[id];
    const dbc = definition.dbc.decode(new DecodeStream(file.data));
    const records = await this.build(dbc.records);
    log(`pre-loaded ${filepath}`);
    return records;
  }

  async load() {
    let preloader = cache.get(this.id);
    if (!preloader) {
      preloader = this.preload();
      cache.set(this.id, preloader);
    }
    this.results = await preloader;
  }
}

export default DBCQuery;
