import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import GameObjectLootType from './GameObjectLootType';
import GameObjectSpawnType from './GameObjectSpawnType';
import GameObjectTypeType from './GameObjectTypeType';
import { LocationCollectionType } from './LocationType';
import QuestType from './QuestType';

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
