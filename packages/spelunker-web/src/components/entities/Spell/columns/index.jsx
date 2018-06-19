import React from 'react';
import gql from 'graphql-tag';

import SpellReference from '../Reference';
import { IDColumn } from '../../../core';

import SpellReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <SpellReferenceColumn />,
];

columns.fragment = gql`
  fragment spellColumns on Spell {
    ...SpellReference
  }

  ${SpellReference.fragment}
`;

export {
  SpellReferenceColumn,
  columns as default,
};
