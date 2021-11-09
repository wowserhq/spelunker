import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import GameObjectType from './GameObjectType.mjs';

export default new GraphQLObjectType({
  name: 'QuestGameObject',
  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    object: { type: new GraphQLNonNull(GameObjectType) },
  }),
});
