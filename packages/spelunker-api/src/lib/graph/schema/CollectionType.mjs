import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../graphql';

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

  static definitionFor(wrappedType, args = {}) {
    return {
      type: this.for(wrappedType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        ...args,
      },
    };
  }
}

export default CollectionType;
