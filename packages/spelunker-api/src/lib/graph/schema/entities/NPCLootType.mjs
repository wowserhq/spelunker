import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import ItemType from './ItemType.mjs';
import NPCType from './NPCType.mjs';

export default new GraphQLObjectType({
  name: 'NPCLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    item: { type: new GraphQLNonNull(ItemType) },
    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
