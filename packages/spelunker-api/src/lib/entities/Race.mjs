import DBCEntity from '../dbc/Entity';

import Side from './Side';

class Race extends DBCEntity {
  static get dbc() {
    return 'ChrRaces';
  }

  static async findByMask(mask, { exclusive = false } = {}) {
    if (exclusive) {
      const sides = await Side.query;
      sides.forEach(side => {
        if ((mask & side.racemask) === side.racemask) {
          mask &= ~side.racemask;
        }
      });
    }

    const races = await Race.query;
    return races.filter(race => (1 << race.id - 1) & mask);
  }

  get filename() {
    return this.data.clientFileString;
  }

  side() {
    return Side.find(this.data.faction);
  }
}

export default Race;
