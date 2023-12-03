import React from 'react';
import { gql } from '@apollo/client';

import ItemReference from '../Reference';
import ItemClass from '../Class';
import { IDColumn } from '../../../core';

import ItemReferenceColumn from './ReferenceColumn';
import ItemClassColumn from './ClassColumn';

const columns = [
  <IDColumn />,
  <ItemReferenceColumn />,
  <ItemClassColumn />,
];

columns.fragment = gql`
  fragment itemColumns on Item {
    ...ItemReference
    ...ItemClass
  }

  ${ItemReference.fragment}
  ${ItemClass.fragment}
`;

export {
  ItemReferenceColumn,
  ItemClassColumn,
  columns as default,
};
