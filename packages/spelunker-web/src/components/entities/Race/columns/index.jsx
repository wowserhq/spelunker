import React from 'react';
import gql from 'graphql-tag';

import RaceReference from '../Reference';
import SideReference from '../../Side/Reference';
import { IDColumn } from '../../../core';
import { SideReferenceColumn } from '../../Side/columns';

import RaceReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <RaceReferenceColumn />,
  <SideReferenceColumn accessor="side" />,
];

columns.fragment = gql`
  fragment raceColumns on Race {
    ...RaceReference
    side {
      ...SideReference
    }
  }

  ${RaceReference.fragment}
  ${SideReference.fragment}
`;

export {
  RaceReferenceColumn,
  columns as default,
};
