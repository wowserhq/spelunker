export default (object, path = '') => {
  return path.split('.').reduce((result, prop) => {
    if (!prop) {
      return result;
    }
    return result[prop];
  }, object);
};
