import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import GameObjectLoot from './GameObjectLoot';
import GameObjectQuestFinisher from './GameObjectQuestFinisher';
import GameObjectQuestStarter from './GameObjectQuestStarter';
import GameObjectSpawn from './GameObjectSpawn';
import Location from './Location';
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

  static search(query, searchQuery) {
    query.where('name', 'LIKE', `%${searchQuery}%`);
  }

  get id() {
    return this.data.entry;
  }

  contains() {
    return GameObjectLoot.query.where({ Entry: this.id });
  }

  ends() {
    return Quest.query.join(
      GameObjectQuestFinisher.fqTableName,
      GameObjectQuestFinisher.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [GameObjectQuestFinisher.fqColumn('id')]: this.id,
    });
  }

  locations() {
    return Location.group(this.spawns());
  }

  objectiveOf() {
    const id = -this.id;
    return Quest.query
      .orWhere({ RequiredNpcOrGo1: id })
      .orWhere({ RequiredNpcOrGo2: id })
      .orWhere({ RequiredNpcOrGo3: id })
      .orWhere({ RequiredNpcOrGo4: id });
  }

  spawns() {
    return GameObjectSpawn.query.where({ id: this.id });
  }

  starts() {
    return Quest.query.join(
      GameObjectQuestStarter.fqTableName,
      GameObjectQuestStarter.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [GameObjectQuestStarter.fqColumn('id')]: this.id,
    });
  }
}

export default GameObject;
