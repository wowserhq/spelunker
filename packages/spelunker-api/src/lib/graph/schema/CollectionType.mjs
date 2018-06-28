import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../graphql';

import Collection from '../../core/Collection';

const cache = new Map();

class CollectionType extends GraphQLObjectType {
  static for(wrappedType) {
    let type = cache.get(wrappedType);
    if (!type) {
      type = new GraphQLNonNull(
        new this({
          name: `${wrappedType}Collection`,
          fields: {
            totalCount: { type: new GraphQLNonNull(GraphQLInt) },
            results: { type: new GraphQLList(wrappedType) },
          },
        })
      );
      cache.set(wrappedType, type);
    }
    return type;
  }

  static definitionFor(wrappedType, options = {}) {
    return {
      type: this.for(wrappedType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        ...options.args,
      },
      resolve: async (obj, args, context, info) => {
        const query = await obj[info.fieldName](args, context, info);
        return new Collection(query, options);
      },
    };
  }
}

export default CollectionType;
