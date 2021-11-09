import DatabaseEntity from '../db/Entity.mjs';
import { worldConnection } from '../db/connections.mjs';

import GameObjectLoot from './GameObjectLoot.mjs';
import ItemDisplayInfo from './ItemDisplayInfo.mjs';
import ItemLoot from './ItemLoot.mjs';
import ItemSet from './ItemSet.mjs';
import NPCLoot from './NPCLoot.mjs';
import NPCSale from './NPCSale.mjs';
import Quest from './Quest.mjs';

class Item extends DatabaseEntity {
  static get connection() {
    return worldConnection;
  }

  static get tableName() {
    return 'item_template';
  }

  static get primaryKey() {
    return 'entry';
  }

  static search(query, searchQuery) {
    query.where('name', 'LIKE', `%${searchQuery}%`);
  }

  get id() {
    return this.data.entry;
  }

  get buyPrice() {
    return this.data.BuyPrice;
  }

  get sellPrice() {
    return this.data.SellPrice;
  }

  get quality() {
    return this.data.Quality;
  }

  displayInfo() {
    return ItemDisplayInfo.find(this.data.displayid);
  }

  containedIn() {
    return ItemLoot.query.where({ Item: this.id });
  }

  containedInObject() {
    return GameObjectLoot.query.where({ Item: this.id });
  }

  contains() {
    return ItemLoot.query.where({ Entry: this.id });
  }

  droppedBy() {
    return NPCLoot.query.where({ Item: this.id }).orderBy('Chance', 'desc');
  }

  itemSet() {
    return ItemSet.find(this.data.itemset);
  }

  objectiveOf() {
    const { id } = this;
    return Quest.query
      .orWhere({ RequiredItemId1: id })
      .orWhere({ RequiredItemId2: id })
      .orWhere({ RequiredItemId3: id })
      .orWhere({ RequiredItemId4: id })
      .orWhere({ RequiredItemId5: id })
      .orWhere({ RequiredItemId6: id });
  }

  providedFor() {
    return Quest.query.where({ StartItem: this.id });
  }

  rewardFrom() {
    const { id } = this;
    return Quest.query
      .orWhere({ RewardItem1: id })
      .orWhere({ RewardItem2: id })
      .orWhere({ RewardItem3: id })
      .orWhere({ RewardItem4: id })
      .orWhere({ RewardChoiceItemID1: id })
      .orWhere({ RewardChoiceItemID2: id })
      .orWhere({ RewardChoiceItemID3: id })
      .orWhere({ RewardChoiceItemID4: id })
      .orWhere({ RewardChoiceItemID5: id })
      .orWhere({ RewardChoiceItemID6: id });
  }

  soldBy() {
    return NPCSale.query.where({ item: this.id });
  }

  starts() {
    if (!this.startquest) {
      return Quest.none;
    }

    return Quest.query.where({
      [Quest.fqColumn('ID')]: this.startquest,
    });
  }
}

export default Item;
