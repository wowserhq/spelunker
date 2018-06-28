import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import ClassType from './ClassType';
import QuestType from './QuestType';
import SideType from './SideType';

export default new GraphQLObjectType({
  name: 'Race',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    filename: { type: new GraphQLNonNull(GraphQLString) },

    side: { type: SideType },

    classes: CollectionType.definitionFor(ClassType),
    quests: CollectionType.definitionFor(QuestType, {
      args: {
        exclusive: { type: GraphQLBoolean },
      },
    }),
  }),
});
