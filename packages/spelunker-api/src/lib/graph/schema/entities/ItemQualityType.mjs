import {
  GraphQLEnumType,
} from '../../../graphql/index.mjs';

export default new GraphQLEnumType({
  name: 'ItemQuality',
  values: {
    POOR: { value: 0 },
    COMMON: { value: 1 },
    UNCOMMON: { value: 2 },
    RARE: { value: 3 },
    EPIC: { value: 4 },
    LEGENDARY: { value: 5 },
    ARTIFACT: { value: 6 },
    HEIRLOOM: { value: 7 },
  },
});
