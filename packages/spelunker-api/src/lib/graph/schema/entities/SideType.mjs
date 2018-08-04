import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import AreaType from './AreaType';
import QuestType from './QuestType';
import RaceType from './RaceType';

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
