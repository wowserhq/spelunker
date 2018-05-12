import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import QuestgiverIcon from '../../images/QuestgiverIcon';

const NPCReference = ({ npc }) => {
  const {
    starts: { totalCount: startCount },
    ends: { totalCount: endCount },
  } = npc;
  return (
    <Link to={`/npcs/${npc.id}`}>
      <QuestgiverIcon count={startCount + endCount} />
      {npc.name}
    </Link>
  );
};

NPCReference.fragment = gql`
  fragment NPCReference on NPC {
    id
    name
    starts {
      totalCount
    }
    ends {
      totalCount
    }
  }
`;

export default NPCReference;
