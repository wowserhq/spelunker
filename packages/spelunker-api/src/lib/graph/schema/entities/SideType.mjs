import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import AreaType from './AreaType.mjs';
import QuestType from './QuestType.mjs';
import RaceType from './RaceType.mjs';

export default new GraphQLObjectType({
  name: 'Side',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: GraphQLString },

    areas: CollectionType.definitionFor(AreaType),
    quests: CollectionType.definitionFor(QuestType, {
      args: {
        exclusive: { type: GraphQLBoolean },
      },
    }),
    races: CollectionType.definitionFor(RaceType),
  }),
});
