import DatabaseEntity from '../db/Entity.mjs';
import { charactersConnection } from '../db/connections.mjs';

import Character from './Character.mjs';
import Quest from './Quest.mjs';

class CharacterQuestStatus extends DatabaseEntity {
  static get connection() {
    return charactersConnection;
  }

  static get tableName() {
    return 'character_queststatus';
  }

  character() {
    return Character.find(this.data.guid);
  }

  quest() {
    return Quest.find(this.data.quest);
  }
}

export default CharacterQuestStatus;
