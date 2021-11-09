import Area from './Area.mjs';
import QuestSort from './QuestSort.mjs';

class QuestCategory {
  static find(id) {
    if (id < 0) {
      return QuestSort.find(-id);
    }
    return Area.find(id);
  }
}

export default QuestCategory;
