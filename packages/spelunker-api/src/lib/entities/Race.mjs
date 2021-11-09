import DBCEntity from '../dbc/Entity.mjs';
import glueStrings from '../mpq/files/GlueStrings.mjs';
import { contains } from '../utils/string.mjs';

import CharBaseInfo from './CharBaseInfo.mjs';
import Class from './Class.mjs';
import Quest from './Quest.mjs';
import Side from './Side.mjs';

class Race extends DBCEntity {
  static get dbc() {
    return 'ChrRaces';
  }

  static search(query, searchQuery) {
    query.filter(race => contains(race.name, searchQuery));
  }

  static async filterByMask(mask, { exclusive = false } = {}) {
    if (exclusive) {
      const sides = await Side.query.execute();
      sides.forEach(side => {
        if ((mask & side.racemask) === side.racemask) {
          mask &= ~side.racemask;
        }
      });
    }

    return Race.query.filter(race => race.mask & mask);
  }

  get description() {
    const entry = `RACE_INFO_${this.data.clientFileString.toUpperCase()}`;
    return glueStrings[entry];
  }

  get filename() {
    return this.data.clientFileString;
  }

  get mask() {
    return (1 << (this.data.id - 1));
  }

  async classes() {
    const links = await CharBaseInfo.query.filter(link => (
      link.raceID === this.id
    )).execute();
    const ids = links.map(link => link.classID);
    return Class.query.filter(klass => ids.includes(klass.id));
  }

  async quests({ exclusive } = {}) {
    const query = Quest.query.where('AllowableRaces', '&', this.mask);
    if (exclusive) {
      const side = await this.side();
      return query.whereRaw(
        '(AllowableRaces & ?) != ?',
        [side.racemask, side.racemask]
      );
    }
    return query.orWhere('AllowableRaces', 0);
  }

  side() {
    return Side.find(this.data.faction);
  }
}

export default Race;
