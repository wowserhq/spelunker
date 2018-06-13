import DBCEntity from '../dbc/Entity';

class Class extends DBCEntity {
  static get dbc() {
    return 'ChrClasses';
  }

  static async findByMask(mask) {
    const classes = await Class.query;
    return classes.filter(klass => (1 << klass.id - 1) & mask);
  }
}

export default Class;
