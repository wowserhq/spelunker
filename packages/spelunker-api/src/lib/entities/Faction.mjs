import DBCEntity from '../dbc/Entity';
import { contains } from '../utils/string';

import Quest from './Quest';

class Faction extends DBCEntity {
  static get dbc() {
    return 'Faction';
  }

  static search(query, searchQuery) {
    query.filter(faction => contains(faction.name, searchQuery));
  }

  objectiveOf() {
    return Quest.query
      .orWhere({ RequiredFactionId1: this.id })
      .orWhere({ RequiredFactionId2: this.id });
  }
}

export default Faction;
