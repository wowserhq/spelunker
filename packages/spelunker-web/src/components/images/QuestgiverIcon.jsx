import React from 'react';

import GameIcon from './GameIcon';

const QuestgiverIcon = (props) => {
  if (props.count < 1) {
    return null;
  }

  return (
    <GameIcon
      {...props}
      file="Interface/GossipFrame/AvailableQuestIcon.blp"
    />
  );
};

QuestgiverIcon.defaultProps = {
  count: 1,
};

export default QuestgiverIcon;
