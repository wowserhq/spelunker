import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const RaceReference = ({ race }) => (
  <Link to={`/races/${race.id}`}>
    {race.name}
  </Link>
);

RaceReference.fragment = gql`
  fragment RaceReference on Race {
    id
    name
  }
`;

export default RaceReference;
