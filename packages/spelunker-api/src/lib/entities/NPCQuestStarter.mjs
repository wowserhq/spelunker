import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

class NPCQuestStarter extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'creature_queststarter';
  }
}

export default NPCQuestStarter;
