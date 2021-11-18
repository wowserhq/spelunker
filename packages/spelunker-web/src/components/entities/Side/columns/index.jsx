import React from 'react';
import { gql } from '@apollo/client';

import SideReference from '../Reference';
import { IDColumn } from '../../../core';

import SideReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <SideReferenceColumn />,
];

columns.fragment = gql`
  fragment sideColumns on Side {
    ...SideReference
  }

  ${SideReference.fragment}
`;

export {
  SideReferenceColumn,
  columns as default,
};
