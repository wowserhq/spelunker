import DBCEntity from '../dbc/Entity';

import Quest from './Quest';

class Faction extends DBCEntity {
  static get dbc() {
    return 'Faction';
  }

  objectiveOf() {
    return Quest.query
      .orWhere({ RequiredFactionId1: this.id })
      .orWhere({ RequiredFactionId2: this.id });
  }
}

export default Faction;
