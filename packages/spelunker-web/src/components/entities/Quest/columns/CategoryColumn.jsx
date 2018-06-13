import React from 'react';

import QuestCategory from '../Category';

const QuestCategoryColumn = ({ value: quest }) => (
  <QuestCategory category={quest.category} />
);

QuestCategoryColumn.defaultProps = {
  id: 'category',
  label: 'Category',
};

export default QuestCategoryColumn;
