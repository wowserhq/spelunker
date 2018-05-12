import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';
import CurrencyType from '../CurrencyType';

import ItemDisplayInfoType from './ItemDisplayInfoType';
import ItemQualityType from './ItemQualityType';
import NPCLootType from './NPCLootType';
import NPCSaleType from './NPCSaleType';

export default new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    buyPrice: { type: CurrencyType },
    sellPrice: { type: CurrencyType },
    quality: { type: ItemQualityType },

    displayInfo: { type: ItemDisplayInfoType },
    droppedBy: CollectionType.definitionFor(NPCLootType),
    soldBy: CollectionType.definitionFor(NPCSaleType),
  }),
});
