import Entity from '../core/Entity';
import MemoryQuery from '../core/MemoryQuery';

const data = [
  {
    id: 'alliance',
    name: 'Alliance',
    icon: 'Interface\\WorldStateFrame\\AllianceIcon',
    // TODO: Fetch races from ChrRaces.dbc
    racemask: 1101,
  },
  {
    id: 'horde',
    name: 'Horde',
    icon: 'Interface\\WorldStateFrame\\HordeIcon',
    // TODO: Fetch races from ChrRaces.dbc
    racemask: 690,
  },
];

class Side extends Entity {
  static get query() {
    return new MemoryQuery(this, {
      load: (query) => {
        // TODO: Performance is terrible here, re-creates dataset
        query.results = query.build(data);
      },
    });
  }

  static async find(id) {
    const results = await this.query;
    return results.find(side => side.id === id);
  }
}

export default Side;
