import React from 'react';
import gql from 'graphql-tag';

import MapReference from '../Reference';
import { IDColumn } from '../../../core';

import MapReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <MapReferenceColumn />,
];

columns.fragment = gql`
  fragment mapColumns on Map {
    ...MapReference
  }

  ${MapReference.fragment}
`;

export {
  MapReferenceColumn,
  columns as default,
};
