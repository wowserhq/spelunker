import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const QuestReference = ({ quest }) => (
  <Link to={`/quests/${quest.id}`}>
    {quest.name}
  </Link>
);

QuestReference.fragment = gql`
  fragment QuestReference on Quest {
    id
    name
  }
`;

export default QuestReference;
