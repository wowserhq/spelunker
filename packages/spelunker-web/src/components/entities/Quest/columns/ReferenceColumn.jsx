import React from 'react';

import QuestReference from '../Reference';

const QuestReferenceColumn = ({ value: quest }) => (
  <QuestReference quest={quest} />
);

QuestReferenceColumn.defaultProps = {
  id: 'quest',
  label: 'Quest',
};

export default QuestReferenceColumn;
