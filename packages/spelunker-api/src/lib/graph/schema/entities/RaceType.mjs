import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import SideType from './SideType';

export default new GraphQLObjectType({
  name: 'Race',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    filename: { type: new GraphQLNonNull(GraphQLString) },

    side: { type: SideType },
  }),
});
