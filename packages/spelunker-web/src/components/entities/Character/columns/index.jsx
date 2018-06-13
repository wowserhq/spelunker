import React from 'react';

import { ClassReferenceColumn } from '../../Class/columns';
import { Column, IDColumn } from '../../../Table';
import { RaceReferenceColumn } from '../../Race/columns';

import CharacterReferenceColumn from './ReferenceColumn';

export default [
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

export {
  CharacterReferenceColumn,
};
