import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import CharacterType from './CharacterType';
import ItemType from './ItemType';

export default new GraphQLObjectType({
  name: 'CharacterItem',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    count: { type: new GraphQLNonNull(GraphQLInt) },

    item: { type: new GraphQLNonNull(ItemType) },
    owner: { type: new GraphQLNonNull(CharacterType) },
  }),
});
