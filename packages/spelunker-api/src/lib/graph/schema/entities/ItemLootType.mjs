import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import ItemType from './ItemType';

export default new GraphQLObjectType({
  name: 'ItemLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    container: { type: new GraphQLNonNull(ItemType) },
    item: { type: new GraphQLNonNull(ItemType) },
  }),
});
