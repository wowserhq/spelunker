import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import QuestType from './QuestType';

export default new GraphQLObjectType({
  name: 'Faction',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    objectiveOf: CollectionType.definitionFor(QuestType),
  }),
});
