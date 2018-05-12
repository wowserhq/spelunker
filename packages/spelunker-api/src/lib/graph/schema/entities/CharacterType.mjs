import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import AccountType from './AccountType';
import ClassType from './ClassType';
import CharacterItemType from './CharacterItemType';
import GenderType from './GenderType';
import MapType from './MapType';
import RaceType from './RaceType';

export default new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },

    race: { type: new GraphQLNonNull(RaceType) },
    class: { type: new GraphQLNonNull(ClassType) },
    gender: { type: GenderType },

    xp: { type: GraphQLInt },
    level: { type: GraphQLInt },

    map: { type: MapType },
    x: { type: GraphQLFloat },
    y: { type: GraphQLFloat },
    z: { type: GraphQLFloat },
    orientation: { type: GraphQLFloat },

    account: { type: new GraphQLNonNull(AccountType) },
    inventory: CollectionType.definitionFor(CharacterItemType),
  }),
});
