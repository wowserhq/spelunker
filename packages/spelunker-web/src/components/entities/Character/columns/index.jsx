import React from 'react';
import gql from 'graphql-tag';

import CharacterReference from '../Reference';
import ClassReference from '../../Class/Reference';
import RaceReference from '../../Race/Reference';
import { ClassReferenceColumn } from '../../Class/columns';
import { Column, IDColumn } from '../../../core';
import { RaceReferenceColumn } from '../../Race/columns';

import CharacterReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <CharacterReferenceColumn />,
  <RaceReferenceColumn accessor="race" />,
  <ClassReferenceColumn accessor="class" />,
  <Column id="gender" label="Gender">
    {(character) => character.gender}
  </Column>,
  <Column id="level" label="Level">
    {(character) => character.level}
  </Column>,
  <Column id="xp" label="XP">
    {(character) => character.xp}
  </Column>,
];

columns.fragment = gql`
  fragment characterColumns on Character {
    ...CharacterReference
    race {
      ...RaceReference
    }
    class {
      ...ClassReference
    }
    gender
    level
    xp
  }

  ${CharacterReference.fragment}
  ${ClassReference.fragment}
  ${RaceReference.fragment}
`;

export {
  CharacterReferenceColumn,
  columns as default,
};
