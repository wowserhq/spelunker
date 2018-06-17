import DBCEntity from '../dbc/Entity';
import glueStrings from '../mpq/files/GlueStrings';

class Class extends DBCEntity {
  static get dbc() {
    return 'ChrClasses';
  }

  static filterByMask(mask) {
    return Class.query.filter(klass => klass.mask & mask);
  }

  get description() {
    const entry = `CLASS_${this.data.filename}`;
    return glueStrings[entry];
  }

  get mask() {
    return (1 << (this.data.id - 1));
  }
}

export default Class;
