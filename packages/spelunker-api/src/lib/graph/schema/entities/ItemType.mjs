import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';
import CurrencyType from '../CurrencyType.mjs';

import GameObjectLootType from './GameObjectLootType.mjs';
import ItemDisplayInfoType from './ItemDisplayInfoType.mjs';
import ItemLootType from './ItemLootType.mjs';
import ItemQualityType from './ItemQualityType.mjs';
import NPCLootType from './NPCLootType.mjs';
import ItemSetType from './ItemSetType.mjs';
import NPCSaleType from './NPCSaleType.mjs';
import QuestType from './QuestType.mjs';

export default new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    buyPrice: { type: CurrencyType },
    itemSet: { type: ItemSetType },
    sellPrice: { type: CurrencyType },
    quality: { type: ItemQualityType },

    displayInfo: { type: ItemDisplayInfoType },

    containedIn: CollectionType.definitionFor(ItemLootType),
    containedInObject: CollectionType.definitionFor(GameObjectLootType),
    contains: CollectionType.definitionFor(ItemLootType),
    droppedBy: CollectionType.definitionFor(NPCLootType),
    objectiveOf: CollectionType.definitionFor(QuestType),
    providedFor: CollectionType.definitionFor(QuestType),
    rewardFrom: CollectionType.definitionFor(QuestType),
    soldBy: CollectionType.definitionFor(NPCSaleType),
    starts: CollectionType.definitionFor(QuestType),
  }),
});
