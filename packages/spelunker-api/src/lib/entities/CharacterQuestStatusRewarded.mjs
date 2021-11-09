import DatabaseEntity from '../db/Entity.mjs';
import { charactersConnection } from '../db/connections.mjs';

class CharacterQuestStatusRewarded extends DatabaseEntity {
  static get connection() {
    return charactersConnection;
  }

  static get tableName() {
    return 'character_queststatus_rewarded';
  }
}

export default CharacterQuestStatusRewarded;
