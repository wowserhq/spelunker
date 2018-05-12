import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import MapType from './MapType';
import NPCType from './NPCType';

export default new GraphQLObjectType({
  name: 'NPCSpawn',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    npc: { type: new GraphQLNonNull(NPCType) },
    map: { type: MapType },
    x: { type: GraphQLFloat },
    y: { type: GraphQLFloat },
    z: { type: GraphQLFloat },
    orientation: { type: GraphQLFloat },
  }),
});
