import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../graphql';

import CollectionType from './CollectionType';

import AccountType from './entities/AccountType';
import CharacterType from './entities/CharacterType';
import ClassType from './entities/ClassType';
import FactionType from './entities/FactionType';
import GameObjectType from './entities/GameObjectType';
import ItemType from './entities/ItemType';
import MapType from './entities/MapType';
import NPCType from './entities/NPCType';
import QuestType from './entities/QuestType';
import RaceType from './entities/RaceType';
import SpellType from './entities/SpellType';

const finderFor = (type) => {
  return {
    type,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
  };
};

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    accounts: CollectionType.definitionFor(AccountType),
    account: finderFor(AccountType),

    characters: CollectionType.definitionFor(CharacterType),
    character: finderFor(CharacterType),

    classes: CollectionType.definitionFor(ClassType),
    class: finderFor(ClassType),

    factions: CollectionType.definitionFor(FactionType),
    faction: finderFor(FactionType),

    items: CollectionType.definitionFor(ItemType),
    item: finderFor(ItemType),

    maps: CollectionType.definitionFor(MapType),
    map: finderFor(MapType),

    npcs: CollectionType.definitionFor(NPCType),
    npc: finderFor(NPCType),

    objects: CollectionType.definitionFor(GameObjectType),
    object: finderFor(GameObjectType),

    quests: CollectionType.definitionFor(QuestType),
    quest: finderFor(QuestType),

    races: CollectionType.definitionFor(RaceType),
    race: finderFor(RaceType),

    spells: CollectionType.definitionFor(SpellType),
    spell: finderFor(SpellType),
  },
});
