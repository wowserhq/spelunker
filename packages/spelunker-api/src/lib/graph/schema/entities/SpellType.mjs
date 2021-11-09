import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import NPCTrainingType from './NPCTrainingType.mjs';
import QuestType from './QuestType.mjs';

export default new GraphQLObjectType({
  name: 'Spell',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: GraphQLString },

    providedFor: CollectionType.definitionFor(QuestType),
    rewardFrom: CollectionType.definitionFor(QuestType),
    taughtBy: CollectionType.definitionFor(NPCTrainingType),
  }),
});
