import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../graphql';

import CollectionType from './CollectionType';

import AccountType from './entities/AccountType';
import AreaType from './entities/AreaType';
import CharacterType from './entities/CharacterType';
import ClassType from './entities/ClassType';
import FactionType from './entities/FactionType';
import GameObjectType from './entities/GameObjectType';
import ItemType from './entities/ItemType';
import MapType from './entities/MapType';
import NPCType from './entities/NPCType';
import QuestType from './entities/QuestType';
import RaceType from './entities/RaceType';
import SideType from './entities/SideType';
import SpellType from './entities/SpellType';

const finderFor = (type, idType = GraphQLInt) => ({
  type,
  args: {
    id: { type: new GraphQLNonNull(idType) },
  },
});

const searchableCollectionFor = (type) => (
  CollectionType.definitionFor(type, {
    args: {
      searchQuery: { type: GraphQLString },
    },
  })
);

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    accounts: searchableCollectionFor(AccountType),
    account: finderFor(AccountType),

    areas: searchableCollectionFor(AreaType),
    area: finderFor(AreaType),

    characters: searchableCollectionFor(CharacterType),
    character: finderFor(CharacterType),

    classes: searchableCollectionFor(ClassType),
    class: finderFor(ClassType),

    factions: searchableCollectionFor(FactionType),
    faction: finderFor(FactionType),

    items: searchableCollectionFor(ItemType),
    item: finderFor(ItemType),

    maps: searchableCollectionFor(MapType),
    map: finderFor(MapType),

    npcs: searchableCollectionFor(NPCType),
    npc: finderFor(NPCType),

    objects: searchableCollectionFor(GameObjectType),
    object: finderFor(GameObjectType),

    quests: searchableCollectionFor(QuestType),
    quest: finderFor(QuestType),

    races: searchableCollectionFor(RaceType),
    race: finderFor(RaceType),

    sides: searchableCollectionFor(SideType),
    side: finderFor(SideType, GraphQLString),

    spells: searchableCollectionFor(SpellType),
    spell: finderFor(SpellType),
  },
});
