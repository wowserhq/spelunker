import {
  GraphQLSchema,
} from '../../graphql/index.mjs';

import QueryType from './QueryType.mjs';

const schema = new GraphQLSchema({
  query: QueryType,
});

export default schema;
