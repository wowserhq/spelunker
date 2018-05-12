export default (object, path) => {
  return path.split('.').reduce((result, prop) => result[prop], object);
};
