import {
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql/index.mjs';

import CurrencyType from '../CurrencyType.mjs';

import NPCType from './NPCType.mjs';
import SpellType from './SpellType.mjs';

export default new GraphQLObjectType({
  name: 'NPCTraining',
  fields: () => ({
    cost: { type: CurrencyType },

    npc: { type: new GraphQLNonNull(NPCType) },
    spell: { type: new GraphQLNonNull(SpellType) },
  }),
});
