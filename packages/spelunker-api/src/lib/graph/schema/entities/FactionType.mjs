import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import QuestType from './QuestType.mjs';

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
