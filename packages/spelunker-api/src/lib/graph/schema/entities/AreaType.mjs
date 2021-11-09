import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql/index.mjs';

import BoundsType from '../BoundsType.mjs';
import CollectionType from '../CollectionType.mjs';

import MapType from './MapType.mjs';
import QuestType from './QuestType.mjs';
import SideType from './SideType.mjs';

const AreaType = new GraphQLObjectType({
  name: 'Area',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    bounds: { type: BoundsType },
    map: { type: new GraphQLNonNull(MapType) },
    parent: { type: AreaType },

    quests: CollectionType.definitionFor(QuestType),
    sides: CollectionType.definitionFor(SideType),
    subareas: CollectionType.definitionFor(AreaType),
  }),
});

export default AreaType;
