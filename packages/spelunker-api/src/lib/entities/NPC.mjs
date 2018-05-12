import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import NPCLoot from './NPCLoot';
import NPCQuestFinisher from './NPCQuestFinisher';
import NPCQuestStarter from './NPCQuestStarter';
import NPCSale from './NPCSale';
import NPCSpawn from './NPCSpawn';
import NPCTraining from './NPCTraining';
import Quest from './Quest';

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

  get id() {
    return this.data.entry;
  }

  async drops(args) {
    const query = NPCLoot.query.where({ Entry: this.id });
    return new Collection(query, args);
  }

  async ends(args) {
    const query = Quest.query.join(
      NPCQuestFinisher.fqTableName,
      NPCQuestFinisher.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [NPCQuestFinisher.fqColumn('id')]: this.id,
    });
    return new Collection(query, args);
  }

  async sells(args) {
    const query = NPCSale.query.where({ entry: this.id });
    return new Collection(query, args);
  }

  async spawns(args) {
    const query = NPCSpawn.query.where({ id: this.id });
    return new Collection(query, args);
  }

  async starts(args) {
    const query = Quest.query.join(
      NPCQuestStarter.fqTableName,
      NPCQuestStarter.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [NPCQuestStarter.fqColumn('id')]: this.id,
    });
    return new Collection(query, args);
  }

  async teaches(args) {
    const query = NPCTraining.query.where({ ID: this.id });
    return new Collection(query, args);
  }
}

export default NPC;
