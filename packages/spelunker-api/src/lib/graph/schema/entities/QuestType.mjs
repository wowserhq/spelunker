import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import ClassType from './ClassType';
import GameObjectType from './GameObjectType';
import ItemType from './ItemType';
import NPCType from './NPCType';
import QuestCategoryType from './QuestCategoryType';
import QuestFactionType from './QuestFactionType';
import QuestItemType from './QuestItemType';
import QuestNPCType from './QuestNPCType';
import QuestGameObjectType from './QuestGameObjectType';
import RaceType from './RaceType';
import SideType from './SideType';
import SpellType from './SpellType';

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
