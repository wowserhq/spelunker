import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import QuestType from './QuestType';

const FactionType = new GraphQLObjectType({
  name: 'Faction',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    parent: { type: FactionType },

    subfactions: CollectionType.definitionFor(FactionType),
    objectiveOf: CollectionType.definitionFor(QuestType),
  }),
});

export default FactionType;
