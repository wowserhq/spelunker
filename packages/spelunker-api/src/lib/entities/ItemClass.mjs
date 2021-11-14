import DBCEntity from '../dbc/Entity.mjs';

class ItemClass extends DBCEntity {
  static get dbc() {
    return 'ItemClass';
  }
}

export default ItemClass;
