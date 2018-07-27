import DatabaseEntity from '../db/Entity';
import { charactersConnection } from '../db/connections';

import Account from './Account';
import CharacterItem from './CharacterItem';
import CharacterQuestStatus from './CharacterQuestStatus';
import CharacterQuestStatusRewarded from './CharacterQuestStatusRewarded';
import CharacterReputation from './CharacterReputation';
import CharacterSpawn from './CharacterSpawn';
import Class from './Class';
import Location from './Location';
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

  account() {
    return Account.find(this.data.account);
  }

  async availableQuests() {
    const race = await this.race();
    const klass = await this.class();

    return Quest.query.whereRaw(
      '(AllowableRaces = 0 OR AllowableRaces & ?)', race.mask
    ).whereRaw(
      '(AllowableClasses IS NULL OR AllowableClasses = 0 OR AllowableClasses & ?)', klass.mask
    );
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

  async location() {
    const spawn = this.spawn();
    const map = await spawn.map();
    const location = new Location(map);
    await location.add(spawn);
    return location;
  }

  race() {
    return Race.find(this.data.race);
  }

  reputation() {
    return CharacterReputation.query.where({ guid: this.id });
  }

  spawn() {
    return new CharacterSpawn(this.data);
  }

  async uncompletedQuests() {
    const query = await this.availableQuests();
    query.leftJoin(CharacterQuestStatusRewarded.fqTableName, (clause) => (
      clause.on(
        CharacterQuestStatusRewarded.fqColumn('quest'),
        Quest.fqColumn('ID')
      ).andOn(
        CharacterQuestStatusRewarded.fqColumn('guid'),
        this.id
      )
    )).whereNull(CharacterQuestStatusRewarded.fqColumn('guid'));

    return query;
  }
}

export default Character;
