import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import QuestType from './QuestType.mjs';
import RaceType from './RaceType.mjs';

export default new GraphQLObjectType({
  name: 'Class',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    filename: { type: new GraphQLNonNull(GraphQLString) },

    quests: CollectionType.definitionFor(QuestType, {
      args: {
        exclusive: { type: GraphQLBoolean },
      },
    }),
    races: CollectionType.definitionFor(RaceType),
  }),
});
