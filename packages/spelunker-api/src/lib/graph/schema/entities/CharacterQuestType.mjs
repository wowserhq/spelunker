import {
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import CharacterType from './CharacterType';
import QuestType from './QuestType';

const CharacterQuestStatus = new GraphQLEnumType({
  name: 'CharacterQuestStatus',
  values: {
    NONE: { value: 0 },
    COMPLETE: { value: 1 },
    UNAVAILABLE: { value: 2 },
    INCOMPLETE: { value: 3 },
    AVAILABLE: { value: 4 },
    FAILED: { value: 5 },
  },
});

export default new GraphQLObjectType({
  name: 'CharacterQuest',
  fields: () => ({
    status: { type: CharacterQuestStatus },

    character: { type: new GraphQLNonNull(CharacterType) },
    quest: { type: new GraphQLNonNull(QuestType) },
  }),
});
