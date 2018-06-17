import MemoryEntity from '../core/memory/Entity';
import glueStrings from '../mpq/files/GlueStrings';

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

  get description() {
    const entry = `FACTION_INFO_${this.data.id.toUpperCase()}`;
    return glueStrings[entry];
  }

  races() {
    return Race.query.filter(race => (
      race.faction === this.data.faction
    ));
  }
}

export default Side;
