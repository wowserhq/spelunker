import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import NPCType from './NPCType';

export default new GraphQLObjectType({
  name: 'QuestNPC',
  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
