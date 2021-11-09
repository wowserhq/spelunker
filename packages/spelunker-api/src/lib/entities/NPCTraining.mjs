import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import NPC from './NPC.mjs';
import Spell from './Spell.mjs';

class NPCTraining extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'npc_trainer';
  }

  static get query() {
    const { connection, fqTableName } = this;

    // Trinity Core treats a negative SpellID as a reference template – grouping
    // together spells under a single "trainer" ID – thus preventing multiple
    // entries for similar trainers.
    const templates = connection(`${fqTableName} as a`)
      .select(
        'b.ID', 'a.SpellID', 'a.MoneyCost',
        'a.ReqSkillLine', 'a.ReqSkillRank', 'a.ReqLevel'
      )
      .join(`${fqTableName} as b`, 'a.ID', connection.raw('-b.SpellID'));

    const regulars = connection(fqTableName).where('SpellID', '>', 0);

    const union = connection.raw('(? union ?) as sub', [templates, regulars]);

    const query = super.query;
    query.knex = connection(union);
    query.where('ID', '<', 20000);
    return query;
  }

  get cost() {
    return this.data.MoneyCost;
  }

  npc() {
    return NPC.find(this.data.ID);
  }

  spell() {
    return Spell.find(this.data.SpellID);
  }
}

export default NPCTraining;
