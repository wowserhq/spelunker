import React from 'react';
import { gql } from '@apollo/client';

import ItemSetReference from '../Reference';
import { IDColumn } from '../../../core';

import ItemSetReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <ItemSetReferenceColumn />,
];

columns.fragment = gql`
  fragment itemSetColumns on ItemSet {
    ...ItemSetReference
  }

  ${ItemSetReference.fragment}
`;

export {
  ItemSetReferenceColumn,
  columns as default,
};
