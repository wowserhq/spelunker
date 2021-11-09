import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import CharacterType from './CharacterType.mjs';
import FactionType from './FactionType.mjs';

export default new GraphQLObjectType({
  name: 'CharacterReputation',
  fields: () => ({
    standing: { type: GraphQLInt },

    character: { type: new GraphQLNonNull(CharacterType) },
    faction: { type: new GraphQLNonNull(FactionType) },
  }),
});
