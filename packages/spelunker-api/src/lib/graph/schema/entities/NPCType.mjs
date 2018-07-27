import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import NPCLootType from './NPCLootType';
import NPCSaleType from './NPCSaleType';
import NPCSpawnType from './NPCSpawnType';
import NPCTrainingType from './NPCTrainingType';
import QuestType from './QuestType';
import { LocationCollectionType } from './LocationType';

export default new GraphQLObjectType({
  name: 'NPC',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    subname: { type: GraphQLString },

    drops: CollectionType.definitionFor(NPCLootType),
    ends: CollectionType.definitionFor(QuestType),
    locations: LocationCollectionType.definitionFor(NPCSpawnType),
    objectiveOf: CollectionType.definitionFor(QuestType),
    sells: CollectionType.definitionFor(NPCSaleType),
    spawns: CollectionType.definitionFor(NPCSpawnType, {
      maxResults: Infinity,
    }),
    starts: CollectionType.definitionFor(QuestType),
    teaches: CollectionType.definitionFor(NPCTrainingType),
  }),
});
