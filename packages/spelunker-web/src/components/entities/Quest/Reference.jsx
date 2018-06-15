import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import SideReference from '../Side/Reference';

const QuestReference = ({ quest }) => (
  <span>
    {quest.sides.map(side => (
      <SideReference side={side} withoutName />
    ))}
    <Link to={`/quests/${quest.id}`}>
      {quest.name}
    </Link>
  </span>
);

QuestReference.fragment = gql`
  fragment QuestReference on Quest {
    id
    name
    sides {
      ...SideReference
    }
  }

  ${SideReference.fragment}
`;

export default QuestReference;
