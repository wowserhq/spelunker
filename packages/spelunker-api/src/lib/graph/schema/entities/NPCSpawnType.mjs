import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import AreaType from './AreaType.mjs';
import MapType from './MapType.mjs';
import NPCType from './NPCType.mjs';

export default new GraphQLObjectType({
  name: 'NPCSpawn',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    npc: { type: new GraphQLNonNull(NPCType) },

    x: { type: new GraphQLNonNull(GraphQLFloat) },
    y: { type: new GraphQLNonNull(GraphQLFloat) },
    z: { type: new GraphQLNonNull(GraphQLFloat) },

    area: { type: AreaType },
    map: { type: new GraphQLNonNull(MapType) },
  }),
});
