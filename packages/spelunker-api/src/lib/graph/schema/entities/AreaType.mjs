import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import BoundsType from '../BoundsType';
import CollectionType from '../CollectionType';

import MapType from './MapType';
import QuestType from './QuestType';
import SideType from './SideType';

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
