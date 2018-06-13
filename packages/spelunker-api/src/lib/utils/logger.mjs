import debug from 'debug';

const logger = (suffix) => {
  const id = `spelunker:${suffix}`;
  return debug(id);
};

export default logger;

export const log = logger('core');
