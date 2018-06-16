import DatabaseEntity from '../db/Entity';
import { charactersConnection } from '../db/connections';

import Account from './Account';
import CharacterItem from './CharacterItem';
import CharacterQuestStatus from './CharacterQuestStatus';
import CharacterQuestStatusRewarded from './CharacterQuestStatusRewarded';
import CharacterReputation from './CharacterReputation';
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

  account() {
    return Account.find(this.data.account);
  }

  class() {
    return Class.find(this.data.class);
  }

  completedQuests() {
    return Quest.query.join(
      CharacterQuestStatusRewarded.fqTableName,
      CharacterQuestStatusRewarded.fqColumn('quest'),
      Quest.fqColumn('ID')
    ).where({
      [CharacterQuestStatusRewarded.fqColumn('guid')]: this.id,
    });
  }

  currentQuests() {
    return CharacterQuestStatus.query.where({ guid: this.id });
  }

  inventory() {
    return CharacterItem.query.where({ owner_guid: this.id });
  }

  race() {
    return Race.find(this.data.race);
  }

  reputation() {
    return CharacterReputation.query.where({ guid: this.id });
  }
  }
}

export default Character;
