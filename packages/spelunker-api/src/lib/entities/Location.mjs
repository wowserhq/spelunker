import MemoryQuery from '../core/memory/Query.mjs';

class Location {
  constructor(map) {
    this.map = map;

    this._areas = new Map();
    this._spawns = [];
  }

  async add(spawn) {
    this._spawns.push(spawn);

    const area = await spawn.area();
    if (area) {
      let entry = this._areas.get(area.id);
      if (!entry) {
        entry = { area, spawnCount: 0 };
        this._areas.set(area.id, entry);
      }
      entry.spawnCount++;
    }
  }

  areas() {
    const query = new MemoryQuery();
    query.load = () => Array.from(this._areas.values());
    return query;
  }

  spawns() {
    const query = new MemoryQuery();
    query.load = () => this._spawns;
    return query;
  }

  static group(spawns) {
    const query = new MemoryQuery();
    query.load = async () => {
      const results = await spawns.execute();
      const maps = new Map();
      for (const spawn of results) {
        const map = await spawn.map();

        let location = maps.get(map.id);
        if (!location) {
          location = new Location(map);
          maps.set(map.id, location);
        }
        await location.add(spawn);
      }
      return Array.from(maps.values());
    };
    return query;
  }
}

export default Location;
