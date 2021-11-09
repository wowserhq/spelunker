import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import ClassType from './ClassType.mjs';
import QuestType from './QuestType.mjs';
import SideType from './SideType.mjs';

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
