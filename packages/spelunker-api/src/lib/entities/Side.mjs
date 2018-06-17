import MemoryEntity from '../core/memory/Entity';

import Race from './Race';

class Side extends MemoryEntity {
  static get data() {
    return [
      {
        id: 'alliance',
        name: 'Alliance',
        icon: 'Interface\\WorldStateFrame\\AllianceIcon',
        faction: 0,
      },
      {
        id: 'horde',
        name: 'Horde',
        icon: 'Interface\\WorldStateFrame\\HordeIcon',
        faction: 1,
      },
    ];
  }

  static async find(id) {
    const results = await this.query.execute();
    return results.find(side => (
      side.id === id || side.faction === id
    ));
  }

  static async build(data) {
    const side = new this(data);
    const races = await side.races().execute();
    for (const race of races) {
      side.racemask |= race.mask;
    }
    return side;
  }

  races() {
    return Race.query.filter(race => (
      race.faction === this.data.faction
    ));
  }
}

export default Side;
