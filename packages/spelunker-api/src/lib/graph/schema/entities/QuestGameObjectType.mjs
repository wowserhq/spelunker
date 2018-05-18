import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import GameObjectType from './GameObjectType';

export default new GraphQLObjectType({
  name: 'QuestGameObject',
  fields: () => ({
    count: { type: new GraphQLNonNull(GraphQLInt) },
    object: { type: new GraphQLNonNull(GameObjectType) },
  }),
});
