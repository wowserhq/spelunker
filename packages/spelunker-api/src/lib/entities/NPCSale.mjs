import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import Item from './Item.mjs';
import NPC from './NPC.mjs';

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

  item() {
    return Item.find(this.data.item);
  }

  npc() {
    return NPC.find(this.data.entry);
  }
}

export default NPCSale;
