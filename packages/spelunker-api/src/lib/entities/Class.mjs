import DBCEntity from '../dbc/Entity';

class Class extends DBCEntity {
  static get dbc() {
    return 'ChrClasses';
  }

  static findByMask(mask) {
    return Class.query.filter(klass => klass.mask & mask);
  }

  get mask() {
    return (1 << (this.data.id - 1));
  }
}

export default Class;
