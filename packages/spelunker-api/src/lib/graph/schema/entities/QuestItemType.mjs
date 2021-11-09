import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import ItemType from './ItemType.mjs';

export default new GraphQLObjectType({
  name: 'QuestItem',
  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    item: { type: new GraphQLNonNull(ItemType) },
  }),
});
