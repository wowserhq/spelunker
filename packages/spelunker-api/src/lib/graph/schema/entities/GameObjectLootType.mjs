import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import GameObjectType from './GameObjectType.mjs';
import ItemType from './ItemType.mjs';

export default new GraphQLObjectType({
  name: 'GameObjectLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    item: { type: new GraphQLNonNull(ItemType) },
    object: { type: new GraphQLNonNull(GameObjectType) },
  }),
});
