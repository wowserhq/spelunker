import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import FactionType from './FactionType';

export default new GraphQLObjectType({
  name: 'QuestFaction',
  fields: () => ({
    value: { type: new GraphQLNonNull(GraphQLInt) },
    faction: { type: new GraphQLNonNull(FactionType) },
  }),
});
