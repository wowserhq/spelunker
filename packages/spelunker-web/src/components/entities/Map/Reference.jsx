import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const MapReference = ({ map }) => (
  <Link to={`/maps/${map.id}`}>
    {map.name}
  </Link>
);

MapReference.fragment = gql`
  fragment MapReference on Map {
    id
    name
  }
`;

export default MapReference;
