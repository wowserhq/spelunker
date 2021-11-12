export default (object, path = '') => path.split('.').reduce((result, prop) => {
  if (!prop) {
    return result;
  }
  return result[prop];
}, object);
