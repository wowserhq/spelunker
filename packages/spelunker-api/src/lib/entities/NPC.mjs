import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import Location from './Location.mjs';
import NPCLoot from './NPCLoot.mjs';
import NPCQuestFinisher from './NPCQuestFinisher.mjs';
import NPCQuestStarter from './NPCQuestStarter.mjs';
import NPCSale from './NPCSale.mjs';
import NPCSpawn from './NPCSpawn.mjs';
import NPCTraining from './NPCTraining.mjs';
import Quest from './Quest.mjs';

class NPC extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'creature_template';
  }

  static get primaryKey() {
    return 'entry';
  }

  static search(query, searchQuery) {
    query.where('name', 'LIKE', `%${searchQuery}%`);
  }

  get id() {
    return this.data.entry;
  }

  drops() {
    return NPCLoot.query.where({ Entry: this.id }).orderBy('Chance', 'desc');
  }

  ends() {
    return Quest.query.join(
      NPCQuestFinisher.fqTableName,
      NPCQuestFinisher.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [NPCQuestFinisher.fqColumn('id')]: this.id,
    });
  }

  locations() {
    return Location.group(this.spawns());
  }

  objectiveOf() {
    return Quest.query
      .orWhere({ RequiredNpcOrGo1: this.id })
      .orWhere({ RequiredNpcOrGo2: this.id })
      .orWhere({ RequiredNpcOrGo3: this.id })
      .orWhere({ RequiredNpcOrGo4: this.id });
  }

  sells() {
    return NPCSale.query.where({ entry: this.id });
  }

  spawns() {
    return NPCSpawn.query.where({ id: this.id });
  }

  starts() {
    return Quest.query.join(
      NPCQuestStarter.fqTableName,
      NPCQuestStarter.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [NPCQuestStarter.fqColumn('id')]: this.id,
    });
  }

  teaches() {
    return NPCTraining.query.where({ ID: this.id });
  }
}

export default NPC;
