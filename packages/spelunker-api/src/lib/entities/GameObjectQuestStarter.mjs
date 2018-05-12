import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

class GameObjectQuestStarter extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'gameobject_queststarter';
  }
}

export default GameObjectQuestStarter;
