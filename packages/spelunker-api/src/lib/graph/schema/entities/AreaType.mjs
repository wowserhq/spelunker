import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import WorldMapAreaType from './WorldMapAreaType';

export default new GraphQLObjectType({
  name: 'Area',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    mapID: { type: GraphQLInt },
    parentID: { type: GraphQLInt },

    worldMapArea: { type: WorldMapAreaType },
  }),
});
