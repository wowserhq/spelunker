import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import ClassIcon from '../Class/Icon';
import RaceIcon from '../Race/Icon';

const CharacterReference = ({ character }) => (
  <Link to={`/characters/${character.id}`}>
    <RaceIcon race={character.race} gender={character.gender} />
    <ClassIcon class={character.class} />

    {character.name}
  </Link>
);

CharacterReference.fragment = gql`
  fragment CharacterReference on Character {
    id
    name
    gender

    class {
      id
      filename
    }

    race {
      id
      filename
    }
  }
`;

export default CharacterReference;
