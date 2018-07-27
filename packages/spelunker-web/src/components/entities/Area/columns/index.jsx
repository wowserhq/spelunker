import React from 'react';
import gql from 'graphql-tag';

import AreaReference from '../Reference';
import { IDColumn } from '../../../core';

import AreaReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <AreaReferenceColumn />,
  <AreaReferenceColumn id="parent" label="Part of" accessor="parent" />,
];

columns.fragment = gql`
  fragment areaColumns on Area {
    ...AreaReference
    parent {
      ...AreaReference
    }
  }

  ${AreaReference.fragment}
`;

export {
  AreaReferenceColumn,
  columns as default,
};
