import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import GameObjectLootType from './GameObjectLootType.mjs';
import GameObjectSpawnType from './GameObjectSpawnType.mjs';
import GameObjectTypeType from './GameObjectTypeType.mjs';
import { LocationCollectionType } from './LocationType.mjs';
import QuestType from './QuestType.mjs';

export default new GraphQLObjectType({
  name: 'GameObject',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GameObjectTypeType) },

    contains: CollectionType.definitionFor(GameObjectLootType),
    ends: CollectionType.definitionFor(QuestType),
    locations: LocationCollectionType.definitionFor(GameObjectSpawnType),
    objectiveOf: CollectionType.definitionFor(QuestType),
    spawns: CollectionType.definitionFor(GameObjectSpawnType, {
      maxResults: Infinity,
    }),
    starts: CollectionType.definitionFor(QuestType),
  }),
});
