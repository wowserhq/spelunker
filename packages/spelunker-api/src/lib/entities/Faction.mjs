import DBCEntity from '../dbc/Entity';

class Faction extends DBCEntity {
  static get dbc() {
    return 'Faction';
  }
}

export default Faction;
