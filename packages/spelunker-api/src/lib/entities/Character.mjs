import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import { charactersConnection } from '../db/connections';

import Account from './Account';
import CharacterItem from './CharacterItem';
import CharacterQuestStatus from './CharacterQuestStatus';
import CharacterQuestStatusRewarded from './CharacterQuestStatusRewarded';
import Class from './Class';
import Race from './Race';
import Quest from './Quest';

class Character extends DatabaseEntity {
  static get connection() {
    return charactersConnection;
  }

  static get tableName() {
    return 'characters';
  }

  static get primaryKey() {
    return 'guid';
  }

  get id() {
    return this.data.guid;
  }

  get x() {
    return this.data.position_x;
  }

  get y() {
    return this.data.position_y;
  }

  get z() {
    return this.data.position_z;
  }

  async account() {
    return Account.find(this.data.account);
  }

  async class() {
    return Class.find(this.data.class);
  }

  async completedQuests(args) {
    const query = Quest.query.join(
      CharacterQuestStatusRewarded.fqTableName,
      CharacterQuestStatusRewarded.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [CharacterQuestStatusRewarded.fqColumn('guid')]: this.id,
    });
    return new Collection(query, args);
  }

  async currentQuests(args) {
    const query = CharacterQuestStatus.query.where({ guid: this.id });
    return new Collection(query, args);
  }

  async inventory(args) {
    const query = CharacterItem.query.where({ owner_guid: this.id });
    return new Collection(query, args);
  }

  async race() {
    return Race.find(this.data.race);
  }
}

export default Character;
