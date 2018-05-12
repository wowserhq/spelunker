import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const GameObjectReference = ({ object }) => (
  <Link to={`/objects/${object.id}`}>
    {object.name}
  </Link>
);

GameObjectReference.fragment = gql`
  fragment GameObjectReference on GameObject {
    id
    name
  }
`;

export default GameObjectReference;
