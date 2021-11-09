import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import Item from './Item.mjs';
import NPC from './NPC.mjs';

class NPCLoot extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'creature_loot_template';
  }

  get chance() {
    return this.data.Chance;
  }

  item() {
    return Item.find(this.data.Item);
  }

  npc() {
    return NPC.find(this.data.Entry);
  }
}

export default NPCLoot;
