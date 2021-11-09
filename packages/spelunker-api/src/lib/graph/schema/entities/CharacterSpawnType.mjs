import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import AreaType from './AreaType.mjs';
import MapType from './MapType.mjs';

export default new GraphQLObjectType({
  name: 'CharacterSpawn',
  fields: () => ({
    x: { type: new GraphQLNonNull(GraphQLFloat) },
    y: { type: new GraphQLNonNull(GraphQLFloat) },
    z: { type: new GraphQLNonNull(GraphQLFloat) },

    area: { type: new GraphQLNonNull(AreaType) },
    map: { type: new GraphQLNonNull(MapType) },
  }),
});
