import Collection from '../core/Collection';
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

  async displayInfo() {
    return ItemDisplayInfo.find(this.data.displayid);
  }

  async containedIn(args) {
    const query = ItemLoot.query.where({ Item: this.id });
    return new Collection(query, args);
  }

  async containedInObject(args) {
    const query = GameObjectLoot.query.where({ Item: this.id });
    return new Collection(query, args);
  }

  async contains(args) {
    const query = ItemLoot.query.where({ Entry: this.id });
    return new Collection(query, args);
  }

  async droppedBy(args) {
    const query = NPCLoot.query.where({ Item: this.id });
    return new Collection(query, args);
  }

  async providedFor(args) {
    const query = Quest.query.where({ StartItem: this.id });
    return new Collection(query, args);
  }

  async rewardFrom(args) {
    const query = Quest.query
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
    return new Collection(query, args);
  }

  async soldBy(args) {
    const query = NPCSale.query.where({ item: this.id });
    return new Collection(query, args);
  }

  async starts(args) {
    const query = Quest.query.where({ ID: this.startquest });
    return new Collection(query, args);
  }
}

export default Item;
