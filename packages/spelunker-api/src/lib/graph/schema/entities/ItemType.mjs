import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';
import CurrencyType from '../CurrencyType';

import GameObjectLootType from './GameObjectLootType';
import ItemDisplayInfoType from './ItemDisplayInfoType';
import ItemLootType from './ItemLootType';
import ItemQualityType from './ItemQualityType';
import NPCLootType from './NPCLootType';
import ItemSetType from './ItemSetType';
import NPCSaleType from './NPCSaleType';
import QuestType from './QuestType';

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
