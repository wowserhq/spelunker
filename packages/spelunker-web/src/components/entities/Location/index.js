class Location {
  constructor({ area, map, spawns, spawnCount }) {
    this.area = area;
    this.map = map;
    this.spawns = spawns;
    this.spawnCount = spawnCount;
  }

  get id() {
    const { area, map } = this;
    return area ? `area-${area.id}` : `map-${map.id}`;
  }

  get name() {
    const { area, map } = this;
    return area ? area.name : map.name;
  }
}

export default Location;
