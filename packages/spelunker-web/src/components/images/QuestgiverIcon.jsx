import React from 'react';

import GameImage from './GameImage';

const QuestgiverIcon = (props) => {
  if (props.count < 1) {
    return null;
  }

  return (
    <GameImage
      {...props}
      file="Interface\GossipFrame\AvailableQuestIcon.blp"
    />
  );
};

QuestgiverIcon.defaultProps = {
  count: 1,
};

export default QuestgiverIcon;
