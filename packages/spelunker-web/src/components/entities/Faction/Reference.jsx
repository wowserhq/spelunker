import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const FactionReference = ({ faction }) => (
  <Link to={`/factions/${faction.id}`}>
    {faction.name}
  </Link>
);

FactionReference.fragment = gql`
  fragment FactionReference on Faction {
    id
    name
  }
`;

export default FactionReference;
