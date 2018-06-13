import Area from './Area';
import QuestSort from './QuestSort';

class QuestCategory {
  static find(id) {
    if (id < 0) {
      return QuestSort.find(-id);
    }
    return Area.find(id);
  }
}

export default QuestCategory;
