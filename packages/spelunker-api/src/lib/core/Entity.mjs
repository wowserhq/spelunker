import { notImplemented } from '../utils/abstract.mjs';

import NoneQuery from './NoneQuery.mjs';

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

  static get none() {
    return new NoneQuery();
  }

  static get query() {
    notImplemented(this, 'query');
  }

  static async find(filterOrID) {
    return this.query.find(filterOrID);
  }

  static async build(data) {
    return new this(data);
  }
}

export default Entity;
