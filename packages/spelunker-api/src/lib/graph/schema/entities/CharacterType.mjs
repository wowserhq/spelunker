import {
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
import CharacterSpawnType from './CharacterSpawnType';
import GenderType from './GenderType';
import LocationType from './LocationType';
import QuestType from './QuestType';
import RaceType from './RaceType';

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: GenderType },
    xp: { type: GraphQLInt },
    level: { type: GraphQLInt },

    account: { type: new GraphQLNonNull(AccountType) },
    class: { type: new GraphQLNonNull(ClassType) },
    location: LocationType.definitionFor(CharacterSpawnType),
    race: { type: new GraphQLNonNull(RaceType) },
    spawn: { type: new GraphQLNonNull(CharacterSpawnType) },

    completedQuests: CollectionType.definitionFor(QuestType),
    currentQuests: CollectionType.definitionFor(CharacterQuestType),
    inventory: CollectionType.definitionFor(CharacterItemType),
    reputation: CollectionType.definitionFor(CharacterReputationType),
    uncompletedQuests: CollectionType.definitionFor(QuestType),
  }),
});

export default CharacterType;
