import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import RaceIcon from './Icon';

const RaceReference = ({ race }) => (
  <Link to={`/races/${race.id}`}>
    <RaceIcon race={race} />
    {race.name}
  </Link>
);

RaceReference.fragment = gql`
  fragment RaceReference on Race {
    id
    name
    filename
  }
`;

export default RaceReference;
