import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import AccountType from './AccountType.mjs';
import ClassType from './ClassType.mjs';
import CharacterItemType from './CharacterItemType.mjs';
import CharacterQuestType from './CharacterQuestType.mjs';
import CharacterReputationType from './CharacterReputationType.mjs';
import CharacterSpawnType from './CharacterSpawnType.mjs';
import GenderType from './GenderType.mjs';
import LocationType from './LocationType.mjs';
import QuestType from './QuestType.mjs';
import RaceType from './RaceType.mjs';

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
