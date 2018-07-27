import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import AreaType from './AreaType';
import MapType from './MapType';

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
