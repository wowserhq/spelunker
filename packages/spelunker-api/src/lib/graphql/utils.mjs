/* eslint-disable import/prefer-default-export */

import {
  GraphQLEnumType,
} from '../graphql/index.mjs';
import { createCache } from '../utils/cache.mjs';

const cache = createCache();

const generateEnumDefinition = (name, types) => (
  new GraphQLEnumType({
    name,
    values: Object.keys(types).reduce((result, key) => {
      result[key] = { value: types[key] };
      return result;
    }, {}),
  })
);

export { cache, generateEnumDefinition };
