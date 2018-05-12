import DBCEntity from '../dbc/Entity';

class Race extends DBCEntity {
  static get dbc() {
    return 'ChrRaces';
  }
}

export default Race;
