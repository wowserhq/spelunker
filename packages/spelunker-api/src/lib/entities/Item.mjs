import DatabaseEntity from '../db/Entity';
import { worldConnection } from '../db/connections';

import GameObjectLoot from './GameObjectLoot';
import ItemDisplayInfo from './ItemDisplayInfo';
import ItemLoot from './ItemLoot';
import NPCLoot from './NPCLoot';
import NPCSale from './NPCSale';
import Quest from './Quest';

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
    return NPCLoot.query.where({ Item: this.id });
  }

  objectiveOf() {
    return Quest.query
      .orWhere({ RequiredItemId1: this.id })
      .orWhere({ RequiredItemId2: this.id })
      .orWhere({ RequiredItemId3: this.id })
      .orWhere({ RequiredItemId4: this.id })
      .orWhere({ RequiredItemId5: this.id })
      .orWhere({ RequiredItemId6: this.id });
  }

  providedFor() {
    return Quest.query.where({ StartItem: this.id });
  }

  rewardFrom() {
    return Quest.query
      .orWhere({ RewardItem1: this.id })
      .orWhere({ RewardItem2: this.id })
      .orWhere({ RewardItem3: this.id })
      .orWhere({ RewardItem4: this.id })
      .orWhere({ RewardChoiceItemID1: this.id })
      .orWhere({ RewardChoiceItemID2: this.id })
      .orWhere({ RewardChoiceItemID3: this.id })
      .orWhere({ RewardChoiceItemID4: this.id })
      .orWhere({ RewardChoiceItemID5: this.id })
      .orWhere({ RewardChoiceItemID6: this.id });
  }

  soldBy() {
    return NPCSale.query.where({ item: this.id });
  }

  starts() {
    return Quest.query.where({
      [Quest.fqColumn('ID')]: this.startquest,
    });
  }
}

export default Item;
