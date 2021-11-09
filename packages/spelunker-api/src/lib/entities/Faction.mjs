import DBCEntity from '../dbc/Entity.mjs';
import { contains } from '../utils/string.mjs';

import Quest from './Quest.mjs';

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

  parent() {
    const { parentID } = this.data;
    if (parentID) {
      return Faction.find(parentID);
    }
    return null;
  }

  subfactions() {
    const { id } = this;
    return Faction.query.filter(faction => faction.parentID === id);
  }
}

export default Faction;
