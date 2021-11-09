import {
  GraphQLUnionType,
} from '../../../graphql/index.mjs';

import AreaType from './AreaType.mjs';
import QuestSortType from './QuestSortType.mjs';

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
