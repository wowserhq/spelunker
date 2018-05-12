import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import CharacterType from './CharacterType';
import GameObjectSpawnType from './GameObjectSpawnType';
import NPCSpawnType from './NPCSpawnType';

export default new GraphQLObjectType({
  name: 'Map',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    characters: CollectionType.definitionFor(CharacterType),
    npcSpawns: CollectionType.definitionFor(NPCSpawnType),
    objectSpawns: CollectionType.definitionFor(GameObjectSpawnType),
  }),
});
