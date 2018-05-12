import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import ItemType from './ItemType';
import NPCType from './NPCType';

export default new GraphQLObjectType({
  name: 'NPCSale',
  fields: () => ({
    maxCount: { type: new GraphQLNonNull(GraphQLInt) },
    restockTime: { type: new GraphQLNonNull(GraphQLInt) },

    item: { type: new GraphQLNonNull(ItemType) },
    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
