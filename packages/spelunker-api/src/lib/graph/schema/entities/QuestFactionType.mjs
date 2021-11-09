import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import FactionType from './FactionType.mjs';

export default new GraphQLObjectType({
  name: 'QuestFaction',
  fields: () => ({
    value: { type: new GraphQLNonNull(GraphQLInt) },
    faction: { type: new GraphQLNonNull(FactionType) },
  }),
});
