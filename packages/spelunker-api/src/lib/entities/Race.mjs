import DBCEntity from '../dbc/Entity';

class Race extends DBCEntity {
  static get dbc() {
    return 'ChrRaces';
  }

  get filename() {
    return this.data.clientFileString;
  }
}

export default Race;
