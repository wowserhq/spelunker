import { notImplemented } from '../utils/abstract';

class Entity {
  constructor(data) {
    this.data = data;

    return new Proxy(this, {
      get(entity, prop) {
        if (Reflect.has(entity, prop)) {
          return Reflect.get(entity, prop);
        }
        return entity.data[prop];
      },
    });
  }

  static search() {
    notImplemented(this, 'search');
  }

  static get query() {
    notImplemented(this, 'query');
  }

  static async find() {
    notImplemented(this, 'find');
  }

  static async build(data) {
    return new this(data);
  }
}

export default Entity;
