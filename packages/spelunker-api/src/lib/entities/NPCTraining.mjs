import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import NPC from './NPC';

class NPCLesson extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'npc_trainer';
  }

  async npc() {
    return NPC.find(this.data.Entry);
  }
}

export default NPCLesson;
