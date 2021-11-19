import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import QuestgiverIcon from '../../images/QuestgiverIcon';

const GameObjectReference = ({ object }) => {
  const {
    id,
    name,
    ends: { totalCount: endCount },
    starts: { totalCount: startCount },
  } = object;

  return (
    <Link to={`/objects/${id}`}>
      <QuestgiverIcon count={startCount + endCount} />
      {name}
    </Link>
  );
};

GameObjectReference.fragment = gql`
  fragment GameObjectReference on GameObject {
    id
    name
    ends {
      totalCount
    }
    starts {
      totalCount
    }
  }
`;

export default GameObjectReference;
