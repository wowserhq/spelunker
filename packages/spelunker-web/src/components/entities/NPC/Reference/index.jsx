import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import QuestgiverIcon from '../../../images/QuestgiverIcon';

import styles from './index.styl';

const NPCReference = ({ npc }) => {
  const {
    starts: { totalCount: startCount },
    ends: { totalCount: endCount },
  } = npc;

  let name = npc.name;
  if (npc.subname) {
    name = (
      <span>
        {npc.name}<br />
        <span className={styles.subname}>
          {npc.subname}
        </span>
      </span>
    );
  }

  return (
    <Link to={`/npcs/${npc.id}`}>
      <QuestgiverIcon count={startCount + endCount} />
      {name}
    </Link>
  );
};

NPCReference.fragment = gql`
  fragment NPCReference on NPC {
    id
    name
    subname
    starts {
      totalCount
    }
    ends {
      totalCount
    }
  }
`;

export default NPCReference;
