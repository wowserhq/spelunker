import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import CharacterType from './CharacterType.mjs';
import ItemType from './ItemType.mjs';

export default new GraphQLObjectType({
  name: 'CharacterItem',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    count: { type: new GraphQLNonNull(GraphQLInt) },

    item: { type: new GraphQLNonNull(ItemType) },
    owner: { type: new GraphQLNonNull(CharacterType) },
  }),
});
