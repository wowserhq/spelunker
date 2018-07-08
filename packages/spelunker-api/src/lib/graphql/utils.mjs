/* eslint-disable import/prefer-default-export */

import {
  GraphQLEnumType,
} from '../graphql';

const generateEnumDefinition = (name, types) => (
  new GraphQLEnumType({
    name,
    values: Object.keys(types).reduce((result, key) => {
      result[key] = { value: types[key] };
      return result;
    }, {}),
  })
);

export { generateEnumDefinition };
