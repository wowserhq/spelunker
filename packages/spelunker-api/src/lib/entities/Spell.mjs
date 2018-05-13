
import Collection from '../core/Collection';
import DBCEntity from '../dbc/Entity';

import NPCTraining from './NPCTraining';

class Spell extends DBCEntity {
  static get dbc() {
    return 'Spell';
  }

  async taughtBy(args) {
    const query = NPCTraining.query.where({ SpellID: this.id });
    return new Collection(query, args);
  }
}

export default Spell;
