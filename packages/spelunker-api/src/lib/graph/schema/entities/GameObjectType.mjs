import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import GameObjectLootType from './GameObjectLootType';
import GameObjectSpawnType from './GameObjectSpawnType';
import QuestType from './QuestType';

export default new GraphQLObjectType({
  name: 'GameObject',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    ends: CollectionType.definitionFor(QuestType),
    spawns: CollectionType.definitionFor(GameObjectSpawnType),
    starts: CollectionType.definitionFor(QuestType),
    contains: CollectionType.definitionFor(GameObjectLootType),
  }),
});
