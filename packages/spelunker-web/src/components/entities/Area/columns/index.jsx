import React from 'react';
import gql from 'graphql-tag';

import AreaReference from '../Reference';
import { IDColumn } from '../../../Table';

import AreaReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <AreaReferenceColumn />,
];

columns.fragment = gql`
  fragment areaColumns on Area {
    ...AreaReference
  }

  ${AreaReference.fragment}
`;

export {
  AreaReferenceColumn,
  columns as default,
};
