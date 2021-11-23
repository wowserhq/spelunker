const PATH_SEPARATOR = /\\|\//;

const isPathBasename = path => !PATH_SEPARATOR.test(path);

const toPipelinePath = path => path.replace(/\\/g, '/').toLowerCase();

export {
  isPathBasename,
  toPipelinePath,
};
