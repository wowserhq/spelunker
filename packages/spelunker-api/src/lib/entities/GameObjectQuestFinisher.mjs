import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

class GameObjectQuestFinisher extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'gameobject_queststarter';
  }
}

export default GameObjectQuestFinisher;
