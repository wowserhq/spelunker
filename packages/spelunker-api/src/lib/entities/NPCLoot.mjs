import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import Item from './Item';
import NPC from './NPC';

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

  async item() {
    return Item.find(this.data.Item);
  }

  async npc() {
    return NPC.find(this.data.Entry);
  }
}

export default NPCLoot;
