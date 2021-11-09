import Area from './Area.mjs';
import Map from './Map.mjs';

class CharacterSpawn {
  constructor(data) {
    this.data = data;
  }

  get x() {
    return this.data.position_x;
  }

  get y() {
    return this.data.position_y;
  }

  get z() {
    return this.data.position_z;
  }

  area() {
    return Area.find(this.data.zone);
  }

  map() {
    return Map.find(this.data.map);
  }
}

export default CharacterSpawn;
