import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import GameObject from './GameObject';
import GameObjectQuestFinisher from './GameObjectQuestFinisher';
import GameObjectQuestStarter from './GameObjectQuestStarter';
import NPC from './NPC';
import NPCQuestFinisher from './NPCQuestFinisher';
import NPCQuestStarter from './NPCQuestStarter';

class Quest extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'quest_template';
  }

  static get primaryKey() {
    return 'ID';
  }

  get id() {
    return this.data.ID;
  }

  get name() {
    return this.data.LogTitle;
  }

  get description() {
    return this.data.LogDescription;
  }

  async endedBy(args) {
    const query = NPC.query.join(
      NPCQuestFinisher.fqTableName,
      NPCQuestFinisher.fqColumn('id'),
      NPC.fqColumn('entry')
    ).where({
      [NPCQuestFinisher.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }

  async endedByObject(args) {
    const query = GameObject.query.join(
      GameObjectQuestFinisher.fqTableName,
      GameObjectQuestFinisher.fqColumn('id'),
      GameObject.fqColumn('entry')
    ).where({
      [GameObjectQuestFinisher.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }

  async startedBy(args) {
    const query = NPC.query.join(
      NPCQuestStarter.fqTableName,
      NPCQuestStarter.fqColumn('id'),
      NPC.fqColumn('entry')
    ).where({
      [NPCQuestStarter.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }

  async startedByObject(args) {
    const query = GameObject.query.join(
      GameObjectQuestStarter.fqTableName,
      GameObjectQuestStarter.fqColumn('id'),
      GameObject.fqColumn('entry')
    ).where({
      [GameObjectQuestStarter.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }
}

export default Quest;
