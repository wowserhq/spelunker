import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import BoundsType from '../BoundsType';
import CollectionType from '../CollectionType';

import AreaType from './AreaType';
import GameObjectSpawnType from './GameObjectSpawnType';
import NPCSpawnType from './NPCSpawnType';

export default new GraphQLObjectType({
  name: 'Map',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    filename: { type: new GraphQLNonNull(GraphQLString) },
    bounds: { type: new GraphQLNonNull(BoundsType) },

    areas: CollectionType.definitionFor(AreaType),
    npcSpawns: CollectionType.definitionFor(NPCSpawnType),
    objectSpawns: CollectionType.definitionFor(GameObjectSpawnType),
  }),
});
