import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import CharacterType from './CharacterType';

export default new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    characters: CollectionType.definitionFor(CharacterType),
  }),
});
