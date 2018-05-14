import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import GameIcon from '../../images/GameIcon';

const SpellReference = ({ spell }) => (
  <Link to={`/spells/${spell.id}`}>
    {spell.icon && <GameIcon file={spell.icon} />}
    {spell.name}
  </Link>
);

SpellReference.fragment = gql`
  fragment SpellReference on Spell {
    id
    name
    icon
  }
`;

export default SpellReference;
