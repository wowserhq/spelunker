import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import GameObjectType from './GameObjectType';
import ItemType from './ItemType';

export default new GraphQLObjectType({
  name: 'GameObjectItemLoot',
  fields: () => ({
    chance: { type: new GraphQLNonNull(GraphQLFloat) },

    npc: { type: new GraphQLNonNull(GameObjectType) },
    item: { type: new GraphQLNonNull(ItemType) },
  }),
});
