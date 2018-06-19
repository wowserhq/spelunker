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
import CharacterQuestType from './CharacterQuestType';
import CharacterReputationType from './CharacterReputationType';
import GenderType from './GenderType';
import MapType from './MapType';
import QuestType from './QuestType';
import RaceType from './RaceType';

export default new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: GenderType },
    xp: { type: GraphQLInt },
    level: { type: GraphQLInt },

    map: { type: MapType },
    x: { type: GraphQLFloat },
    y: { type: GraphQLFloat },
    z: { type: GraphQLFloat },
    orientation: { type: GraphQLFloat },
    account: { type: new GraphQLNonNull(AccountType) },
    class: { type: new GraphQLNonNull(ClassType) },
    race: { type: new GraphQLNonNull(RaceType) },

    completedQuests: CollectionType.definitionFor(QuestType),
    currentQuests: CollectionType.definitionFor(CharacterQuestType),
    inventory: CollectionType.definitionFor(CharacterItemType),
    reputation: CollectionType.definitionFor(CharacterReputationType),
    uncompletedQuests: CollectionType.definitionFor(QuestType),
  }),
});
