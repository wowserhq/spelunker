import DBCEntity from '../dbc/Entity.mjs';

import Class from './Class.mjs';
import Race from './Race.mjs';

class CharBaseInfo extends DBCEntity {
  static get dbc() {
    return 'CharBaseInfo';
  }

  class() {
    return Class.find(this.data.classID);
  }

  race() {
    return Race.find(this.data.raceID);
  }
}

export default CharBaseInfo;
