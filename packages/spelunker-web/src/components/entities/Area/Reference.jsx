import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import SideReference from '../Side/Reference';

const AreaReference = ({ area }) => (
  <span>
    {area.sides.results.map(side => (
      <SideReference key={side.id} side={side} withoutName />
    ))}
    <Link to={`/areas/${area.id}`}>
      {area.name}
    </Link>
  </span>
);

AreaReference.fragment = gql`
  fragment AreaReference on Area {
    id
    name

    sides {
      results {
        ...SideReference
      }
    }
  }

  ${SideReference.fragment}
`;

export default AreaReference;
