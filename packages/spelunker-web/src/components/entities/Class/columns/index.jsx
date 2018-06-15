import React from 'react';
import gql from 'graphql-tag';

import ClassReference from '../Reference';
import { IDColumn } from '../../../Table';

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
