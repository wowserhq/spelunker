import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import BoundsType from '../BoundsType.mjs';
import CollectionType from '../CollectionType.mjs';

import AreaType from './AreaType.mjs';
import GameObjectSpawnType from './GameObjectSpawnType.mjs';
import NPCSpawnType from './NPCSpawnType.mjs';

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
