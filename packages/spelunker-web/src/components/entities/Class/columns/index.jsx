import React from 'react';
import { gql } from '@apollo/client';

import ClassReference from '../Reference';
import { IDColumn } from '../../../core';

import ClassReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <ClassReferenceColumn />,
];

columns.fragment = gql`
  fragment classColumns on Class {
    ...ClassReference
  }

  ${ClassReference.fragment}
`;

export {
  ClassReferenceColumn,
  columns as default,
};
