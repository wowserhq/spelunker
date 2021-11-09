import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import NPCLootType from './NPCLootType.mjs';
import NPCSaleType from './NPCSaleType.mjs';
import NPCSpawnType from './NPCSpawnType.mjs';
import NPCTrainingType from './NPCTrainingType.mjs';
import QuestType from './QuestType.mjs';
import { LocationCollectionType } from './LocationType.mjs';

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
