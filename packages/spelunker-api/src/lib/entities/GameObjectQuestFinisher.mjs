import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

class GameObjectQuestFinisher extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'gameobject_questender';
  }
}

export default GameObjectQuestFinisher;
