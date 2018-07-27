import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import AreaType from './AreaType';
import GameObjectType from './GameObjectType';
import MapType from './MapType';

export default new GraphQLObjectType({
  name: 'GameObjectSpawn',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    object: { type: new GraphQLNonNull(GameObjectType) },

    x: { type: new GraphQLNonNull(GraphQLFloat) },
    y: { type: new GraphQLNonNull(GraphQLFloat) },
    z: { type: new GraphQLNonNull(GraphQLFloat) },

    area: { type: AreaType },
    map: { type: new GraphQLNonNull(MapType) },
  }),
});
