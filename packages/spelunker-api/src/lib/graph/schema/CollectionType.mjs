import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../graphql';
import { cache } from '../../graphql/utils';

import Collection from '../../core/Collection';

class CollectionType extends GraphQLObjectType {
  static for(wrappedType) {
    const name = `${wrappedType.toString().replace('!', '')}Collection`;
    return cache([name], () => (
      new GraphQLNonNull(
        new this({
          name,
          fields: {
            totalCount: { type: new GraphQLNonNull(GraphQLInt) },
            results: { type: new GraphQLList(wrappedType) },
          },
        })
      )
    ));
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
        return new Collection(query, {
          ...options,
          args: args,
        });
      },
    };
  }
}

export default CollectionType;
