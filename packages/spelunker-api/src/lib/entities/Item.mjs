import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import ItemDisplayInfo from './ItemDisplayInfo';
import NPCLoot from './NPCLoot';
import NPCSale from './NPCSale';

class Item extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'item_template';
  }

  static get primaryKey() {
    return 'entry';
  }

  get id() {
    return this.data.entry;
  }

  get buyPrice() {
    return this.data.BuyPrice;
  }

  get sellPrice() {
    return this.data.SellPrice;
  }

  get quality() {
    return this.data.Quality;
  }

  async displayInfo() {
    return ItemDisplayInfo.find(this.data.displayid);
  }

  async droppedBy(args) {
    const query = NPCLoot.query.where({ Item: this.id });
    return new Collection(query, args);
  }

  async soldBy(args) {
    const query = NPCSale.query.where({ item: this.id });
    return new Collection(query, args);
  }
}

export default Item;
