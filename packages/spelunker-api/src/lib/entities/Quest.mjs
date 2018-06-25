import DatabaseEntity from '../db/Entity';
import FixedColumnQuery from '../db/FixedColumnQuery';
import MemoryQuery from '../core/memory/Query';
import { worldConnection } from '../db/connections';

import Class from './Class';
import Faction from './Faction';
import GameObject from './GameObject';
import GameObjectQuestFinisher from './GameObjectQuestFinisher';
import GameObjectQuestStarter from './GameObjectQuestStarter';
import Item from './Item';
import NPC from './NPC';
import NPCQuestFinisher from './NPCQuestFinisher';
import NPCQuestStarter from './NPCQuestStarter';
import QuestCategory from './QuestCategory';
import Race from './Race';
import Side from './Side';
import Spell from './Spell';

class Quest extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'quest_template';
  }

  static get primaryKey() {
    return this.fqColumn('ID');
  }

  static get query() {
    return super.query.leftJoin(
      'quest_template_addon',
      this.primaryKey,
      'quest_template_addon.ID',
    ).select('*').select(`${this.primaryKey} AS id`);
  }

  static search(query, searchQuery) {
    query.where('LogTitle', 'LIKE', `%${searchQuery}%`);
  }

  get name() {
    return this.data.LogTitle;
  }

  get description() {
    return this.data.LogDescription;
  }

  get level() {
    return this.data.QuestLevel;
  }

  get repeatable() {
    return this.data.SpecialFlags & 1;
  }

  get requiredLevel() {
    return this.data.MinLevel;
  }

  get requiredMoney() {
    const value = this.data.RewardMoney;
    if (value >= 0) {
      return null;
    }
    return -value;
  }

  get rewardMoney() {
    const value = this.data.RewardMoney;
    if (value <= 0) {
      return null;
    }
    return value;
  }

  category() {
    return QuestCategory.find(this.data.QuestSortID);
  }

  chain() {
    const query = new MemoryQuery(this);
    query.load = async () => {
      const prev = [];
      const next = [];
      let quest = this;
      while (quest = await quest.previous()) {
        prev.unshift(quest);
      }
      quest = this;
      while (quest = await quest.next()) {
        next.push(quest);
      }
      if (!prev.length && !next.length) {
        return [];
      }
      return prev.concat(this).concat(next);
    };
    return query;
  }

  classes() {
    const mask = this.data.AllowableClasses;
    return Class.filterByMask(mask);
  }

  endedBy() {
    return NPC.query.join(
      NPCQuestFinisher.fqTableName,
      NPCQuestFinisher.fqColumn('id'),
      NPC.fqColumn('entry')
    ).where({
      [NPCQuestFinisher.fqColumn('quest')]: this.id,
    });
  }

  endedByObject() {
    return GameObject.query.join(
      GameObjectQuestFinisher.fqTableName,
      GameObjectQuestFinisher.fqColumn('id'),
      GameObject.fqColumn('entry')
    ).where({
      [GameObjectQuestFinisher.fqColumn('quest')]: this.id,
    });
  }

  next() {
    // TODO: Consider fetching quests that have PrevQuestID pointing to this one
    const id = this.data.NextQuestID || this.data.RewardNextQuest;
    if (!id) {
      return null;
    }
    return Quest.find(id);
  }

  objectiveTexts() {
    return [
      this.data.ObjectiveText1,
      this.data.ObjectiveText2,
      this.data.ObjectiveText3,
      this.data.ObjectiveText4,
    ];
  }

  prerequisiteFactionReputation() {
    return new FixedColumnQuery(Faction, {
      label: `requiredFactions for quest ${this.id}`,
      end: 2,
      resolve: async (i) => {
        const {
          [`RequiredFactionId${i}`]: id,
          [`RequiredFactionValue${i}`]: value,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          value,
          faction: await Faction.find(id),
        };
      },
    });
  }

  prerequisiteLevel() {
    return this.data.MinLevel;
  }

  prerequisiteMaxLevel() {
    return this.data.MaxLevel;
  }

  previous() {
    const id = this.data.PrevQuestID;
    if (!id) {
      return null;
    }
    return Quest.find(id);
  }

  providedItem() {
    const id = this.data.StartItem;
    if (!id) {
      return null;
    }
    return Item.find(id);
  }

  providedSpell() {
    const id = this.data.SourceSpellID;
    if (!id) {
      return null;
    }
    return Spell.find(id);
  }

  races(args) {
    const mask = this.data.AllowableRaces;
    return Race.filterByMask(mask, args);
  }

  requiredFactionReputation() {
    return new FixedColumnQuery(Faction, {
      label: `requiredFactionReputation for quest ${this.id}`,
      end: 2,
      resolve: async (i) => {
        const {
          [`RequiredFactionId${i}`]: id,
          [`RequiredFactionValue${i}`]: value,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          value,
          faction: await Faction.find(id),
        };
      },
    });
  }

  requiredItems() {
    return new FixedColumnQuery(Item, {
      label: `requiredItems for quest ${this.id}`,
      end: 6,
      resolve: async (i) => {
        const {
          [`RequiredItemId${i}`]: id,
          [`RequiredItemCount${i}`]: count,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          count,
          item: await Item.find(id),
        };
      },
    });
  }

  requiredNPCs() {
    return new FixedColumnQuery(NPC, {
      label: `requiredNPCs for quest ${this.id}`,
      end: 4,
      resolve: async (i) => {
        const {
          [`RequiredNpcOrGo${i}`]: id,
          [`RequiredNpcOrGoCount${i}`]: count,
        } = this.data;

        if (!id || id < 0) {
          return null;
        }

        return {
          count,
          npc: await NPC.find(id),
        };
      },
    });
  }

  requiredObjects() {
    return new FixedColumnQuery(GameObject, {
      label: `requiredObjects for quest ${this.id}`,
      end: 4,
      resolve: async (i) => {
        const {
          [`RequiredNpcOrGo${i}`]: id,
          [`RequiredNpcOrGoCount${i}`]: count,
        } = this.data;

        if (!id || id > 0) {
          return null;
        }

        return {
          count,
          object: await GameObject.find(id),
        };
      },
    });
  }

  rewardChoiceItems() {
    return new FixedColumnQuery(Item, {
      label: `rewardChoiceItems for quest ${this.id}`,
      end: 6,
      resolve: async (i) => {
        const {
          [`RewardChoiceItemID${i}`]: id,
          [`RewardChoiceItemQuantity${i}`]: count,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          count,
          item: await Item.find(id),
        };
      },
    });
  }

  rewardFactionReputation() {
    return new FixedColumnQuery(Faction, {
      label: `rewardFactionReputation for quest ${this.id}`,
      end: 5,
      resolve: async (i) => {
        const {
          [`RewardFactionID${i}`]: id,
          [`RewardFactionValue${i}`]: value,
          // [`RewardFactionOverride${i}`]: override,
        } = this.data;

        if (!id) {
          return null;
        }

        // TODO: Lookup faction reward value in DBC

        return {
          value,
          faction: await Faction.find(id),
        };
      },
    });
  }

  rewardItems() {
    return new FixedColumnQuery(Item, {
      label: `rewardItems for quest ${this.id}`,
      end: 4,
      resolve: async (i) => {
        const {
          [`RewardItem${i}`]: id,
          [`RewardAmount${i}`]: count,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          count,
          item: await Item.find(id),
        };
      },
    });
  }

  rewardDisplaySpell() {
    if (!this.data.RewardDisplaySpell) {
      return null;
    }
    return Spell.find(this.data.RewardDisplaySpell);
  }

  rewardSpell() {
    if (!this.data.RewardSpell) {
      return null;
    }
    return Spell.find(this.data.RewardSpell);
  }

  sides() {
    const mask = this.data.AllowableRaces;

    const sides = Side.query;
    if (mask) {
      return sides.filter(side => mask & side.racemask);
    }
    return sides;
  }

  startedBy() {
    return NPC.query.join(
      NPCQuestStarter.fqTableName,
      NPCQuestStarter.fqColumn('id'),
      NPC.fqColumn('entry')
    ).where({
      [NPCQuestStarter.fqColumn('quest')]: this.id,
    });
  }

  startedByItem() {
    return Item.query.where({ startquest: this.id });
  }

  startedByObject() {
    return GameObject.query.join(
      GameObjectQuestStarter.fqTableName,
      GameObjectQuestStarter.fqColumn('id'),
      GameObject.fqColumn('entry')
    ).where({
      [GameObjectQuestStarter.fqColumn('quest')]: this.id,
    });
  }
}

export default Quest;
