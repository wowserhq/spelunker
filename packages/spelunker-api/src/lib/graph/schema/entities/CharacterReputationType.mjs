import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import CharacterType from './CharacterType';
import FactionType from './FactionType';

export default new GraphQLObjectType({
  name: 'CharacterReputation',
  fields: () => ({
    standing: { type: GraphQLInt },

    character: { type: new GraphQLNonNull(CharacterType) },
    faction: { type: new GraphQLNonNull(FactionType) },
  }),
});
