import {
  GraphQLUnionType,
} from '../../../graphql';

import AreaType from './AreaType';
import QuestSortType from './QuestSortType';

const lookup = {
  Area: AreaType,
  QuestSort: QuestSortType,
};

export default new GraphQLUnionType({
  name: 'QuestCategory',
  types: () => [AreaType, QuestSortType],
  resolveType: (value) => {
    const name = value.constructor.name;
    return lookup[name];
  },
});
