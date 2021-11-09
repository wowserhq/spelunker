import DBCEntity from '../dbc/Entity.mjs';
import { contains } from '../utils/string.mjs';

import NPCTraining from './NPCTraining.mjs';
import Quest from './Quest.mjs';
import SpellIcon from './SpellIcon.mjs';

class Spell extends DBCEntity {
  static get dbc() {
    return 'Spell';
  }

  static search(query, searchQuery) {
    query.filter(spell => contains(spell.name, searchQuery));
  }

  async icon() {
    const entry = await SpellIcon.find(this.data.iconID);
    return entry ? entry.file : null;
  }

  providedFor() {
    return Quest.query.where({ SourceSpellID: this.id });
  }

  rewardFrom() {
    const { id } = this;
    return Quest.query
      .orWhere({ RewardSpell: id })
      .orWhere({ RewardDisplaySpell: id });
  }

  taughtBy() {
    return NPCTraining.query.where({ SpellID: this.id });
  }
}

export default Spell;
