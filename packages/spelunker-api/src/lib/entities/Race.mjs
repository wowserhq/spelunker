import DBCEntity from '../dbc/Entity';
import glueStrings from '../mpq/files/GlueStrings';

import Quest from './Quest';
import Side from './Side';

class Race extends DBCEntity {
  static get dbc() {
    return 'ChrRaces';
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
