import DBCEntity from '../dbc/Entity';

import NPCTraining from './NPCTraining';
import SpellIcon from './SpellIcon';

class Spell extends DBCEntity {
  static get dbc() {
    return 'Spell';
  }

  async icon() {
    const entry = await SpellIcon.find(this.data.iconID);
    return entry ? entry.file : null;
  }

  taughtBy() {
    return NPCTraining.query.where({ SpellID: this.id });
  }
}

export default Spell;
