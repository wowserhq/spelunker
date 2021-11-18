import React from 'react';
import { gql } from '@apollo/client';

import CharacterReference from '../Reference';
import ClassReference from '../../Class/Reference';
import RaceReference from '../../Race/Reference';
import { ClassReferenceColumn } from '../../Class/columns';
import { Column, IDColumn } from '../../../core';
import { RaceReferenceColumn } from '../../Race/columns';
import { humanize } from '../../../../utils/inflector';

import CharacterReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <CharacterReferenceColumn />,
  <RaceReferenceColumn accessor="race" />,
  <ClassReferenceColumn accessor="class" />,
  <Column id="gender" label="Gender" accessor="gender">
    {(gender) => humanize(gender)}
  </Column>,
  <Column id="level" label="Level" accessor="level" />,
  <Column id="xp" label="XP" accessor="xp" />,
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
