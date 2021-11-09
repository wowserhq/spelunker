import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import ItemType from './ItemType.mjs';
import NPCType from './NPCType.mjs';

export default new GraphQLObjectType({
  name: 'NPCSale',
  fields: () => ({
    maxCount: { type: new GraphQLNonNull(GraphQLInt) },
    restockTime: { type: new GraphQLNonNull(GraphQLInt) },

    item: { type: new GraphQLNonNull(ItemType) },
    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
