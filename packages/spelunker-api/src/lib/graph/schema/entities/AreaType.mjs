import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import QuestType from './QuestType';
import WorldMapAreaType from './WorldMapAreaType';

export default new GraphQLObjectType({
  name: 'Area',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    worldMapArea: { type: WorldMapAreaType },

    quests: CollectionType.definitionFor(QuestType),
  }),
});
