import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import CharacterType from './CharacterType.mjs';

export default new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    characters: CollectionType.definitionFor(CharacterType),
  }),
});
