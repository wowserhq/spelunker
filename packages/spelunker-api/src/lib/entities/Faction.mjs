import Collection from '../core/Collection';
import DBCEntity from '../dbc/Entity';

import Quest from './Quest';

class Faction extends DBCEntity {
  static get dbc() {
    return 'Faction';
  }

  async objectiveOf(args) {
    const query = Quest.query
      .orWhere({ RequiredFactionId1: this.id })
      .orWhere({ RequiredFactionId2: this.id });
    return new Collection(query, args);
  }
}

export default Faction;
