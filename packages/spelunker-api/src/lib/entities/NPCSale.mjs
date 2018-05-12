import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import Item from './Item';
import NPC from './NPC';

class NPCSale extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'npc_vendor';
  }

  get maxCount() {
    return this.data.maxcount;
  }

  get restockTime() {
    return this.data.incrtime;
  }

  async item() {
    return Item.find(this.data.item);
  }

  async npc() {
    return NPC.find(this.data.entry);
  }
}

export default NPCSale;
