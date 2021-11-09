import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import ClassType from './ClassType.mjs';
import GameObjectType from './GameObjectType.mjs';
import ItemType from './ItemType.mjs';
import NPCType from './NPCType.mjs';
import QuestCategoryType from './QuestCategoryType.mjs';
import QuestFactionType from './QuestFactionType.mjs';
import QuestItemType from './QuestItemType.mjs';
import QuestNPCType from './QuestNPCType.mjs';
import QuestGameObjectType from './QuestGameObjectType.mjs';
import RaceType from './RaceType.mjs';
import SideType from './SideType.mjs';
import SpellType from './SpellType.mjs';

const QuestType = new GraphQLObjectType({
  name: 'Quest',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    level: { type: GraphQLInt },
    prerequisiteLevel: { type: GraphQLInt },
    prerequisiteMaxLevel: { type: GraphQLInt },
    repeatable: { type: GraphQLBoolean },
    requiredLevel: { type: GraphQLInt },
    requiredMoney: { type: GraphQLInt },
    rewardMoney: { type: GraphQLInt },

    category: { type: QuestCategoryType },
    chain: CollectionType.definitionFor(QuestType, {
      maxResults: Infinity,
    }),
    classes: CollectionType.definitionFor(ClassType),
    endedBy: CollectionType.definitionFor(NPCType),
    endedByObject: CollectionType.definitionFor(GameObjectType),
    mutuallyExclusiveWith: CollectionType.definitionFor(QuestType),
    nextQuest: { type: QuestType },
    nextQuests: CollectionType.definitionFor(QuestType),
    objectiveTexts: { type: new GraphQLList(GraphQLString) },
    prerequisiteChoiceQuests: CollectionType.definitionFor(QuestType),
    prerequisiteFactionReputation: CollectionType.definitionFor(QuestFactionType),
    prerequisiteQuests: CollectionType.definitionFor(QuestType),
    previousQuest: { type: QuestType },
    providedItem: { type: ItemType },
    providedSpell: { type: SpellType },
    races: CollectionType.definitionFor(RaceType, {
      args: {
        exclusive: { type: GraphQLBoolean },
      },
    }),
    requiredFactionReputation: CollectionType.definitionFor(QuestFactionType),
    requiredItems: CollectionType.definitionFor(QuestItemType),
    requiredNPCs: CollectionType.definitionFor(QuestNPCType),
    requiredObjects: CollectionType.definitionFor(QuestGameObjectType),
    rewardChoiceItems: CollectionType.definitionFor(QuestItemType),
    rewardDisplaySpell: { type: SpellType },
    rewardFactionReputation: CollectionType.definitionFor(QuestFactionType),
    rewardItems: CollectionType.definitionFor(QuestItemType),
    rewardSpell: { type: SpellType },
    sides: CollectionType.definitionFor(SideType),
    startedBy: CollectionType.definitionFor(NPCType),
    startedByItem: CollectionType.definitionFor(ItemType),
    startedByObject: CollectionType.definitionFor(GameObjectType),
  }),
});

export default QuestType;
