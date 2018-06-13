import {
  GraphQLUnionType,
} from '../../../graphql';

import AreaType from './AreaType';
import QuestSortType from './QuestSortType';

export default new GraphQLUnionType({
  name: 'QuestCategory',
  types: [AreaType, QuestSortType],
  resolveType: (value) => {
    const name = value.constructor.name;
    return {
      Area: AreaType,
      QuestSort: QuestSortType,
    }[name];
  },
});
