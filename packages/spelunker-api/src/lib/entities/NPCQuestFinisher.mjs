import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

class NPCQuestFinisher extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'creature_questender';
  }
}

export default NPCQuestFinisher;
