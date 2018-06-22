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

  static search(query, searchQuery) {
    query.whereRaw('name COLLATE utf8_general_ci LIKE ?', `%${searchQuery}%`);
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

  async uncompletedQuests() {
    const race = await this.race();
    const klass = await this.class();

    return Quest.query.leftJoin(
      CharacterQuestStatus.fqTableName,
      (clause) => {
        clause.on(
          CharacterQuestStatus.fqColumn('quest'),
          Quest.fqColumn('ID')
        ).andOn(
          CharacterQuestStatus.fqColumn('guid'),
          this.id
        );
      }
    )
      .whereNull(CharacterQuestStatus.fqColumn('guid'))
      .where((builder) => (
        builder.where('AllowableRaces', 0)
          .orWhere('AllowableRaces', '&', race.mask)
      ))
      .where((builder) => (
        builder.where('AllowableClasses', 0)
          .orWhere('AllowableClasses', '&', klass.mask)
      ));
  }
}

export default Character;
