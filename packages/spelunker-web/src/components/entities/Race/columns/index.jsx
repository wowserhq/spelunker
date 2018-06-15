import React from 'react';
import gql from 'graphql-tag';

import RaceReference from '../Reference';
import { IDColumn, PlaceholderColumn } from '../../../Table';

import RaceReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <RaceReferenceColumn />,
  <PlaceholderColumn label="Side" />,
];

columns.fragment = gql`
  fragment raceColumns on Race {
    ...RaceReference
  }

  ${RaceReference.fragment}
`;

export {
  RaceReferenceColumn,
  columns as default,
};
