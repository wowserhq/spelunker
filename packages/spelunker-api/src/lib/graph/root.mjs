import Account from '../entities/Account';
import Area from '../entities/Area';
import Character from '../entities/Character';
import Class from '../entities/Class';
import Faction from '../entities/Faction';
import GameObject from '../entities/GameObject';
import Item from '../entities/Item';
import Map from '../entities/Map';
import NPC from '../entities/NPC';
import Quest from '../entities/Quest';
import Race from '../entities/Race';
import Side from '../entities/Side';
import Spell from '../entities/Spell';

export default {
  accounts: () => Account.query,
  account: ({ id }) => Account.find(id),

  areas: () => Area.query,
  area: ({ id }) => Area.find(id),

  characters: () => Character.query,
  character: ({ id }) => Character.find(id),

  classes: () => Class.query,
  class: ({ id }) => Class.find(id),

  factions: () => Faction.query,
  faction: ({ id }) => Faction.find(id),

  items: () => Item.query,
  item: ({ id }) => Item.find(id),

  maps: () => Map.query,
  map: ({ id }) => Map.find(id),

  npcs: () => NPC.query,
  npc: ({ id }) => NPC.find(id),

  objects: () => GameObject.query,
  object: ({ id }) => GameObject.find(id),

  quests: () => Quest.query,
  quest: ({ id }) => Quest.find(id),

  races: () => Race.query,
  race: ({ id }) => Race.find(id),

  sides: () => Side.query,
  side: ({ id }) => Side.find(id),

  spells: () => Spell.query,
  spell: ({ id }) => Spell.find(id),
};
