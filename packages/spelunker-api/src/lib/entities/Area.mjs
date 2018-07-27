import DBCEntity from '../dbc/Entity';
import { contains } from '../utils/string';

import Map from './Map';
import Quest from './Quest';
import Side from './Side';
import WorldMapArea from './WorldMapArea';

class Area extends DBCEntity {
  static get dbc() {
    return 'AreaTable';
  }

  static async findByCoords(mapID, x, y, z) {
    // TODO: Correct way of finding an area by coordinates would be to load up
    // the corresponding map tile, but that is slow. Once we swap to Kaitai
    // structures this may be feasible. This current implementation relies on
    // the world map but is inaccurate for some locations.
    const wmas = await WorldMapArea.filterByCoords(mapID, x, y, z).execute();
    const wma = wmas[0];
    return wma && await wma.area();
  }

  static search(query, searchQuery) {
    query.filter(area => contains(area.name, searchQuery));
  }

  async bounds() {
    const wma = await this.worldMapArea();
    return wma && wma.position;
  }

  map() {
    return Map.find(this.data.mapID);
  }

  parent() {
    const { parentID } = this.data;
    if (parentID) {
      return Area.find(parentID);
    }
    return null;
  }

  quests() {
    return Quest.query.where({ QuestSortID: this.id });
  }

  async sides() {
    const { factionGroupID, parentID } = this.data;
    if (!factionGroupID && parentID) {
      return (await this.parent()).sides();
    }
    // TODO: Refactor into a method on Side entity
    return Side.query.filter(
      side => side.faction === factionGroupID / 2 - 1
    );
  }

  subareas() {
    return Area.query.filter(area => area.parentID === this.id);
  }

  async worldMapArea() {
    return WorldMapArea.findByArea(this.id);
  }
}

export default Area;
