import logger from './logger.mjs';

const SEPARATOR = '/';

const generateCacheKey = (keys) => (
  keys.map(key => (
    key instanceof Function ? key.name : key
  )).join(SEPARATOR)
);

const createCache = (log = null) => {
  const cache = new Map();

  return (keys, generator) => {
    const key = generateCacheKey(keys);
    if (cache.has(key)) {
      return cache.get(key);
    }
    log && log('populating', key);
    const value = generator();
    cache.set(key, value);
    return value;
  };
};

const cache = createCache(logger('cache'));
export default cache;
export { createCache, generateCacheKey };
