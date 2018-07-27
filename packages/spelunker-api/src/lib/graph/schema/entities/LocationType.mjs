import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import AreaType from './AreaType';
import MapType from './MapType';

const LocationAreaType = new GraphQLObjectType({
  name: 'LocationArea',
  fields: () => ({
    area: { type: new GraphQLNonNull(AreaType) },
    spawnCount: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

class LocationType extends GraphQLObjectType {
  static for(wrappedType) {
    return new GraphQLNonNull(
      new this({
        name: `${wrappedType}Location`,
        fields: {
          map: { type: new GraphQLNonNull(MapType) },
          areas: CollectionType.definitionFor(LocationAreaType, {
            maxResults: Infinity,
          }),
          spawns: CollectionType.definitionFor(wrappedType, {
            maxResults: Infinity,
          }),
        },
      })
    );
  }

  static definitionFor(wrappedType) {
    return { type: this.for(wrappedType) };
  }
}

class LocationCollectionType extends CollectionType {
  static definitionFor(wrappedType) {
    return super.definitionFor(LocationType.for(wrappedType), {
      maxResults: Infinity,
    });
  }
}

export default LocationType;
export { LocationCollectionType };
