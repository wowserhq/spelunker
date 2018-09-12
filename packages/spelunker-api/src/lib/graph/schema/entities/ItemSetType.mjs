import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import ItemQualityType from './ItemQualityType';
import ItemType from './ItemType';

export default new GraphQLObjectType({
  name: 'ItemSet',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    quality: { type: ItemQualityType },

    items: CollectionType.definitionFor(ItemType),
  }),
});
