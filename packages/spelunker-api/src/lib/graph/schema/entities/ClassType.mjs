import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import QuestType from './QuestType';

export default new GraphQLObjectType({
  name: 'Class',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    filename: { type: new GraphQLNonNull(GraphQLString) },

    quests: CollectionType.definitionFor(QuestType, {
      exclusive: { type: GraphQLBoolean },
    }),
  }),
});
