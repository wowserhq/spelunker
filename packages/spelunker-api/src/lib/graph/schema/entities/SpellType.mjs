import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import NPCTrainingType from './NPCTrainingType';
import QuestType from './QuestType';

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
