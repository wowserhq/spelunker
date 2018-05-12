import {
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import CurrencyType from '../CurrencyType';
import NPCType from './NPCType';

export default new GraphQLObjectType({
  name: 'NPCTraining',
  fields: () => ({
    cost: { type: CurrencyType },

    npc: { type: new GraphQLNonNull(NPCType) },
  }),
});
