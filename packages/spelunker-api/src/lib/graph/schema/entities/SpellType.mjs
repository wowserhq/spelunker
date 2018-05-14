import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import NPCTrainingType from './NPCTrainingType';

export default new GraphQLObjectType({
  name: 'Spell',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    icon: { type: GraphQLString },

    taughtBy: CollectionType.definitionFor(NPCTrainingType),
  }),
});
