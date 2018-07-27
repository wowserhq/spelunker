import React from 'react';
import gql from 'graphql-tag';

import FactionReference from '../Reference';
import { IDColumn } from '../../../core';

import FactionReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <FactionReferenceColumn />,
  <FactionReferenceColumn id="parent" label="Part of" accessor="parent" />,
];

columns.fragment = gql`
  fragment factionColumns on Faction {
    ...FactionReference
    parent {
      ...FactionReference
    }
  }

  ${FactionReference.fragment}
`;

export {
  FactionReferenceColumn,
  columns as default,
};
