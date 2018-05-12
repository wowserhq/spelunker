import {
  GraphQLEnumType,
} from '../../../graphql';

export default new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: { value: 0 },
    FEMALE: { value: 1 },
  },
});
