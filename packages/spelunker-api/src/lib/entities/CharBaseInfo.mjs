import DBCEntity from '../dbc/Entity';

import Class from './Class';
import Race from './Race';

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
