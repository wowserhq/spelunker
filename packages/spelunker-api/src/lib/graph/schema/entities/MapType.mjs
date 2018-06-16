import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import GameObjectSpawnType from './GameObjectSpawnType';
import NPCSpawnType from './NPCSpawnType';

export default new GraphQLObjectType({
  name: 'Map',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    npcSpawns: CollectionType.definitionFor(NPCSpawnType),
    objectSpawns: CollectionType.definitionFor(GameObjectSpawnType),
  }),
});
