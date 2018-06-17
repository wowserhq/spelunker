import DatabaseEntity from '../db/Entity';
import FixedColumnQuery from '../db/FixedColumnQuery';
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

  get name() {
    return this.data.LogTitle;
  }

  get description() {
    return this.data.LogDescription;
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

  classes() {
    const mask = this.data.AllowableClasses;
    return Class.findByMask(mask);
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

  providedItem() {
    const id = this.data.StartItem;
    if (!id) {
      return null;
    }
    return Item.find(id);
  }

  races(args) {
    const mask = this.data.AllowableRaces;
    return Race.findByMask(mask, args);
  }

  requiredFactions() {
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
