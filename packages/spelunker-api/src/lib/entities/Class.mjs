import DBCEntity from '../dbc/Entity';
import glueStrings from '../mpq/files/GlueStrings';

import CharBaseInfo from './CharBaseInfo';
import Race from './Race';
import Quest from './Quest';

class Class extends DBCEntity {
  static get dbc() {
    return 'ChrClasses';
  }

  static filterByMask(mask) {
    return Class.query.filter(klass => klass.mask & mask);
  }

  static async allMask() {
    // TODO: This should be cached
    let mask = 0;
    const classes = await this.query.execute();
    for (const klass of classes) {
      mask |= klass.mask;
    }
    return mask;
  }

  get description() {
    const entry = `CLASS_${this.data.filename}`;
    return glueStrings[entry];
  }

  get mask() {
    return (1 << (this.data.id - 1));
  }

  async quests({ exclusive } = {}) {
    const query = Quest.query.where('AllowableClasses', '&', this.mask);

    if (exclusive) {
      const allMask = await Class.allMask();
      return query.whereNot('AllowableClasses', allMask);
    }
    return query.orWhere('AllowableClasses', 0);
  }

  async races() {
    const links = await CharBaseInfo.query.filter(link => (
      link.classID === this.id
    )).execute();
    const ids = links.map(link => link.raceID);
    return Race.query.filter(race => ids.includes(race.id));
  }
}

export default Class;
