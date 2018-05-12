import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

export default new GraphQLObjectType({
  name: 'ItemDisplayInfo',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    icon: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
