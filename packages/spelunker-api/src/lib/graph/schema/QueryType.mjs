import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../graphql/index.mjs';

import CollectionType from './CollectionType.mjs';

import AccountType from './entities/AccountType.mjs';
import AreaType from './entities/AreaType.mjs';
import CharacterType from './entities/CharacterType.mjs';
import ClassType from './entities/ClassType.mjs';
import FactionType from './entities/FactionType.mjs';
import GameObjectType from './entities/GameObjectType.mjs';
import ItemType from './entities/ItemType.mjs';
import ItemSetType from './entities/ItemSetType.mjs';
import MapType from './entities/MapType.mjs';
import NPCType from './entities/NPCType.mjs';
import QuestType from './entities/QuestType.mjs';
import RaceType from './entities/RaceType.mjs';
import SideType from './entities/SideType.mjs';
import SpellType from './entities/SpellType.mjs';

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

    itemSets: searchableCollectionFor(ItemSetType),
    itemSet: finderFor(ItemSetType),

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
