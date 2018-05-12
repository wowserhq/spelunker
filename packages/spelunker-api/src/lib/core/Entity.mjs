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
}

export default Entity;
