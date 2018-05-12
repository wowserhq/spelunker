import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const CharacterReference = ({ character }) => (
  <Link to={`/characters/${character.id}`}>
    {character.name}
  </Link>
);

CharacterReference.fragment = gql`
  fragment CharacterReference on Character {
    id
    name
  }
`;

export default CharacterReference;
