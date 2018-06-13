import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import SideReference from '../Side/Reference';

const QuestReference = ({ quest }) => (
  <Link to={`/quests/${quest.id}`}>
    {quest.sides.map(side => (
      <SideReference side={side} withoutName />
    ))}

    {quest.name}
  </Link>
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
