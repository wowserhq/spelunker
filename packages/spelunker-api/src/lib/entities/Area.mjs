import DBCEntity from '../dbc/Entity';

import WorldMapArea from './WorldMapArea';

class Area extends DBCEntity {
  static get dbc() {
    return 'AreaTable';
  }

  async worldMapArea() {
    const results = await WorldMapArea.query;
    return results.find(wma => (
      wma.areaID === this.id
    ));
  }
}

export default Area;
