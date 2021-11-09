import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../graphql/index.mjs';

export default new GraphQLObjectType({
  name: 'Bounds',
  fields: () => ({
    top: { type: new GraphQLNonNull(GraphQLFloat) },
    bottom: { type: new GraphQLNonNull(GraphQLFloat) },
    left: { type: new GraphQLNonNull(GraphQLFloat) },
    right: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
