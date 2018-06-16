import Entity from '../core/Entity';
import MemoryQuery from '../core/MemoryQuery';

import Race from './Race';

const data = [
  {
    id: 'alliance',
    name: 'Alliance',
    icon: 'Interface\\WorldStateFrame\\AllianceIcon',
    // TODO: Fetch races from ChrRaces.dbc
    racemask: 1101,
    faction: 0,
  },
  {
    id: 'horde',
    name: 'Horde',
    icon: 'Interface\\WorldStateFrame\\HordeIcon',
    // TODO: Fetch races from ChrRaces.dbc
    racemask: 690,
    faction: 1,
  },
];

let cache;

class Side extends Entity {
  static get query() {
    return new MemoryQuery(this, {
      load: async (query) => {
        if (!cache) {
          cache = query.build(data);
        }
        query.results = await cache;
      },
    });
  }

  static async find(id) {
    const results = await this.query;
    return results.find(side => (
      side.id === id || side.faction === id
    ));
  }

  races() {
    return Race.query.filter(race => (
      race.faction === this.data.faction
    ));
  }
}

export default Side;
