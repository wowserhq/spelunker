import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import ItemType from './ItemType';
import NPCType from './NPCType';

export default new GraphQLObjectType({
  name: 'NPCLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    item: { type: new GraphQLNonNull(ItemType) },
    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
