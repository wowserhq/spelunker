import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import GameObjectLoot from './GameObjectLoot';
import GameObjectQuestFinisher from './GameObjectQuestFinisher';
import GameObjectQuestStarter from './GameObjectQuestStarter';
import GameObjectSpawn from './GameObjectSpawn';
import Quest from './Quest';

class GameObject extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'gameobject_template';
  }

  static get primaryKey() {
    return 'entry';
  }

  get id() {
    return this.data.entry;
  }

  async contains(args) {
    const query = GameObjectLoot.query.where({ Entry: this.id });
    return new Collection(query, args);
  }

  async ends(args) {
    const query = Quest.query.join(
      GameObjectQuestFinisher.fqTableName,
      GameObjectQuestFinisher.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [GameObjectQuestFinisher.fqColumn('id')]: this.id,
    });
    return new Collection(query, args);
  }

  async spawns(args) {
    const query = GameObjectSpawn.query.where({ id: this.id });
    return new Collection(query, args);
  }

  async starts(args) {
    const query = Quest.query.join(
      GameObjectQuestStarter.fqTableName,
      GameObjectQuestStarter.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [GameObjectQuestStarter.fqColumn('id')]: this.id,
    });
    return new Collection(query, args);
  }
}

export default GameObject;
