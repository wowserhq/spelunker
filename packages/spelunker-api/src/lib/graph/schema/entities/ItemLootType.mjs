import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import ItemType from './ItemType.mjs';

export default new GraphQLObjectType({
  name: 'ItemLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    container: { type: new GraphQLNonNull(ItemType) },
    item: { type: new GraphQLNonNull(ItemType) },
  }),
});
