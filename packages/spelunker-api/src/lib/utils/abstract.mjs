/* eslint-disable import/prefer-default-export */

export const notImplemented = (object, method) => {
  let name = `${object.constructor.name}.prototype`;
  if (object instanceof Function) {
    name = `${object.name}`;
  }
  throw new Error(`${name}.${method} not implemented`);
};
