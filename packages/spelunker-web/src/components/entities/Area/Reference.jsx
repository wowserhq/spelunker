import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const AreaReference = ({ area }) => (
  <Link to={`/areas/${area.id}`}>
    {area.name}
  </Link>
);

AreaReference.fragment = gql`
  fragment AreaReference on Area {
    id
    name
  }
`;

export default AreaReference;
