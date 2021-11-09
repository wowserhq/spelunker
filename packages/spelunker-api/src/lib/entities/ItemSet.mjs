import DBCEntity from '../dbc/Entity.mjs';
import { contains } from '../utils/string.mjs';

import Item from './Item.mjs';

class ItemSet extends DBCEntity {
  static get dbc() {
    return 'ItemSet';
  }

  static search(query, searchQuery) {
    query.filter(itemSet => contains(itemSet.name, searchQuery));
  }

  async quality() {
    const item = await this.items().first().execute();
    return item.quality;
  }

  items() {
    const itemIDs = this.data.itemIDs.filter(id => id);
    return Item.query.whereIn('entry', itemIDs);
  }
}

export default ItemSet;
