import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import ItemType from './ItemType';

export default new GraphQLObjectType({
  name: 'QuestItem',
  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    item: { type: new GraphQLNonNull(ItemType) },
  }),
});
