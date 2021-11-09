import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import CollectionType from '../CollectionType.mjs';

import ItemQualityType from './ItemQualityType.mjs';
import ItemType from './ItemType.mjs';

export default new GraphQLObjectType({
  name: 'ItemSet',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    quality: { type: ItemQualityType },

    items: CollectionType.definitionFor(ItemType),
  }),
});
