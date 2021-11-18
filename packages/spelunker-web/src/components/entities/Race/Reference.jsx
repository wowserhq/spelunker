import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import RaceIcon from './Icon';

const RaceReference = ({ race, iconSize, withoutIcon, withoutName }) => (
  <Link to={`/races/${race.id}`}>
    {!withoutIcon && <RaceIcon race={race} size={iconSize} />}
    {!withoutName && race.name}
  </Link>
);

RaceReference.defaultProps = {
  withoutIcon: false,
  withoutName: false,
};

RaceReference.fragment = gql`
  fragment RaceReference on Race {
    id
    name
    filename
  }
`;

export default RaceReference;
