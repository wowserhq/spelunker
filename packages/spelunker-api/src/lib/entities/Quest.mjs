import Collection from '../core/Collection';
import DatabaseEntity from '../db/Entity';
import FixedColumnQuery from '../db/FixedColumnQuery';
import { worldConnection } from '../db/connections';

import Faction from './Faction';
import GameObject from './GameObject';
import GameObjectQuestFinisher from './GameObjectQuestFinisher';
import GameObjectQuestStarter from './GameObjectQuestStarter';
import Item from './Item';
import NPC from './NPC';
import NPCQuestFinisher from './NPCQuestFinisher';
import NPCQuestStarter from './NPCQuestStarter';
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
    return 'ID';
  }

  get id() {
    return this.data.ID;
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

  async endedBy(args) {
    const query = NPC.query.join(
      NPCQuestFinisher.fqTableName,
      NPCQuestFinisher.fqColumn('id'),
      NPC.fqColumn('entry')
    ).where({
      [NPCQuestFinisher.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }

  async endedByObject(args) {
    const query = GameObject.query.join(
      GameObjectQuestFinisher.fqTableName,
      GameObjectQuestFinisher.fqColumn('id'),
      GameObject.fqColumn('entry')
    ).where({
      [GameObjectQuestFinisher.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }

  async providedItem() {
    const id = this.data.StartItem;
    if (!id) {
      return null;
    }
    return Item.find(id);
  }

  async requiredFactions(args) {
    const query = FixedColumnQuery.for(Faction, {
      label: `requiredFactions for quest ${this.id}`,
      end: 2,
      resolve: (i) => {
        const {
          [`RequiredFactionId${i}`]: id,
          [`RequiredFactionValue${i}`]: value,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          value,
          faction: async () => Faction.find(id),
        };
      },
    });
    return new Collection(query, args);
  }

  async requiredItems(args) {
    const query = FixedColumnQuery.for(Item, {
      label: `requiredItems for quest ${this.id}`,
      end: 6,
      resolve: (i) => {
        const {
          [`RequiredItemId${i}`]: id,
          [`RequiredItemCount${i}`]: count,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          count,
          item: async () => Item.find(id),
        };
      },
    });
    return new Collection(query, args);
  }

  async requiredNPCs(args) {
    const query = FixedColumnQuery.for(NPC, {
      label: `requiredNPCs for quest ${this.id}`,
      end: 4,
      resolve: (i) => {
        const {
          [`RequiredNpcOrGo${i}`]: id,
          [`RequiredNpcOrGoCount${i}`]: count,
        } = this.data;

        if (!id || id < 0) {
          return null;
        }

        return {
          count,
          npc: async () => NPC.find(id),
        };
      },
    });
    return new Collection(query, args);
  }

  async requiredObjects(args) {
    const query = FixedColumnQuery.for(GameObject, {
      label: `requiredObjects for quest ${this.id}`,
      end: 4,
      resolve: (i) => {
        const {
          [`RequiredNpcOrGo${i}`]: id,
          [`RequiredNpcOrGoCount${i}`]: count,
        } = this.data;

        if (!id || id > 0) {
          return null;
        }

        return {
          count,
          object: async () => GameObject.find(id),
        };
      },
    });
    return new Collection(query, args);
  }

  async rewardChoiceItems(args) {
    const query = FixedColumnQuery.for(Item, {
      label: `rewardChoiceItems for quest ${this.id}`,
      end: 6,
      resolve: (i) => {
        const {
          [`RewardChoiceItemID${i}`]: id,
          [`RewardChoiceItemQuantity${i}`]: count,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          count,
          item: async () => Item.find(id),
        };
      },
    });
    return new Collection(query, args);
  }

  async rewardItems(args) {
    const query = FixedColumnQuery.for(Item, {
      label: `rewardItems for quest ${this.id}`,
      end: 4,
      resolve: (i) => {
        const {
          [`RewardItem${i}`]: id,
          [`RewardAmount${i}`]: count,
        } = this.data;

        if (!id) {
          return null;
        }

        return {
          count,
          item: async () => Item.find(id),
        };
      },
    });
    return new Collection(query, args);
  }

  async rewardDisplaySpell() {
    if (!this.data.RewardDisplaySpell) {
      return null;
    }
    return Spell.find(this.data.RewardDisplaySpell);
  }

  async rewardSpell() {
    if (!this.data.RewardSpell) {
      return null;
    }
    return Spell.find(this.data.RewardSpell);
  }

  async sides() {
    const mask = this.data.AllowableRaces;

    const sides = await Side.query;
    if (mask) {
      return sides.filter(side => mask & side.racemask);
    }
    return sides;
  }

  async startedBy(args) {
    const query = NPC.query.join(
      NPCQuestStarter.fqTableName,
      NPCQuestStarter.fqColumn('id'),
      NPC.fqColumn('entry')
    ).where({
      [NPCQuestStarter.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }

  async startedByItem(args) {
    const query = Item.query.where({ startquest: this.id });
    return new Collection(query, args);
  }

  async startedByObject(args) {
    const query = GameObject.query.join(
      GameObjectQuestStarter.fqTableName,
      GameObjectQuestStarter.fqColumn('id'),
      GameObject.fqColumn('entry')
    ).where({
      [GameObjectQuestStarter.fqColumn('quest')]: this.id,
    });
    return new Collection(query, args);
  }
}

export default Quest;
