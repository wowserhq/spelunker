import DatabaseEntity from '../db/Entity.mjs';
import { charactersConnection } from '../db/connections.mjs';

import Character from './Character.mjs';
import Faction from './Faction.mjs';

class CharacterReputation extends DatabaseEntity {
  static get connection() {
    return charactersConnection;
  }

  static get tableName() {
    return 'character_reputation';
  }

  character() {
    return Character.find(this.data.guid);
  }

  faction() {
    return Faction.find(this.data.faction);
  }
}

export default CharacterReputation;
