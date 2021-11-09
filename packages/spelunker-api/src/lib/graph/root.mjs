import Account from '../entities/Account.mjs';
import Area from '../entities/Area.mjs';
import Character from '../entities/Character.mjs';
import Class from '../entities/Class.mjs';
import Faction from '../entities/Faction.mjs';
import GameObject from '../entities/GameObject.mjs';
import Item from '../entities/Item.mjs';
import ItemSet from '../entities/ItemSet.mjs';
import Map from '../entities/Map.mjs';
import NPC from '../entities/NPC.mjs';
import Quest from '../entities/Quest.mjs';
import Race from '../entities/Race.mjs';
import Side from '../entities/Side.mjs';
import Spell from '../entities/Spell.mjs';

export default {
  accounts: ({ searchQuery }) => Account.query.search(searchQuery),
  account: ({ id }) => Account.find(id),

  areas: ({ searchQuery }) => Area.query.search(searchQuery),
  area: ({ id }) => Area.find(id),

  characters: ({ searchQuery }) => Character.query.search(searchQuery),
  character: ({ id }) => Character.find(id),

  classes: ({ searchQuery }) => Class.query.search(searchQuery),
  class: ({ id }) => Class.find(id),

  factions: ({ searchQuery }) => Faction.query.search(searchQuery),
  faction: ({ id }) => Faction.find(id),

  items: ({ searchQuery }) => Item.query.search(searchQuery),
  item: ({ id }) => Item.find(id),

  itemSets: ({ searchQuery }) => ItemSet.query.search(searchQuery),
  itemSet: ({ id }) => ItemSet.find(id),

  maps: ({ searchQuery }) => Map.query.search(searchQuery),
  map: ({ id }) => Map.find(id),

  npcs: ({ searchQuery }) => NPC.query.search(searchQuery),
  npc: ({ id }) => NPC.find(id),

  objects: ({ searchQuery }) => GameObject.query.search(searchQuery),
  object: ({ id }) => GameObject.find(id),

  quests: ({ searchQuery }) => Quest.query.search(searchQuery),
  quest: ({ id }) => Quest.find(id),

  races: ({ searchQuery }) => Race.query.search(searchQuery),
  race: ({ id }) => Race.find(id),

  sides: ({ searchQuery }) => Side.query.search(searchQuery),
  side: ({ id }) => Side.find(id),

  spells: ({ searchQuery }) => Spell.query.search(searchQuery),
  spell: ({ id }) => Spell.find(id),
};
