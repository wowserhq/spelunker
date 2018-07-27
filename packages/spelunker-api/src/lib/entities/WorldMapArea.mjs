import DBCEntity from '../dbc/Entity';

import Area from './Area';

class WorldMapArea extends DBCEntity {
  static get dbc() {
    return 'WorldMapArea';
  }

  static filterByCoords(mapID, x, y) {
    return this.query.filter(wma => (
      wma.mapID === mapID &&
      wma.areaID !== 0 &&
      wma.position.left >= y &&
      wma.position.right <= y &&
      wma.position.top >= x &&
      wma.position.bottom <= x
    ));
  }

  static findByArea(areaID) {
    return this.query.find(wma => wma.areaID === areaID);
  }

  area() {
    return Area.find(this.data.areaID);
  }
}

export default WorldMapArea;
