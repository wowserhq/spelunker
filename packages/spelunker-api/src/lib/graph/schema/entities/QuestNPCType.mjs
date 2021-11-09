import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import NPCType from './NPCType.mjs';

export default new GraphQLObjectType({
  name: 'QuestNPC',
  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
