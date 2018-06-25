import DBCEntity from '../dbc/Entity';
import { contains } from '../utils/string';

import Quest from './Quest';
import WorldMapArea from './WorldMapArea';

class Area extends DBCEntity {
  static get dbc() {
    return 'AreaTable';
  }

  static search(query, searchQuery) {
    query.filter(area => contains(area.name, searchQuery));
  }

  quests() {
    return Quest.query.where({ QuestSortID: this.id });
  }

  async worldMapArea() {
    const results = await WorldMapArea.query;
    return results.find(wma => (
      wma.areaID === this.id
    ));
  }
}

export default Area;
