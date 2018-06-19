import React from 'react';
import gql from 'graphql-tag';

import ItemReference from '../Reference';
import { IDColumn } from '../../../core';

import ItemReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <ItemReferenceColumn />,
];

columns.fragment = gql`
  fragment itemColumns on Item {
    ...ItemReference
  }

  ${ItemReference.fragment}
`;

export {
  ItemReferenceColumn,
  columns as default,
};
