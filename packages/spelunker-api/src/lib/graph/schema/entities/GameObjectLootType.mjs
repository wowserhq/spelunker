import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import GameObjectType from './GameObjectType';
import ItemType from './ItemType';

export default new GraphQLObjectType({
  name: 'GameObjectLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    item: { type: new GraphQLNonNull(ItemType) },
    object: { type: new GraphQLNonNull(GameObjectType) },
  }),
});
