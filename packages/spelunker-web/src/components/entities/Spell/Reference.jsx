import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const SpellReference = ({ spell }) => (
  <Link to={`/spells/${spell.id}`}>
    {spell.name}
  </Link>
);

SpellReference.fragment = gql`
  fragment SpellReference on Spell {
    id
    name
  }
`;

export default SpellReference;
