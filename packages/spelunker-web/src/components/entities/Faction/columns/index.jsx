import React from 'react';
import gql from 'graphql-tag';

import FactionReference from '../Reference';
import { IDColumn } from '../../../core';

import FactionReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <FactionReferenceColumn />,
];

columns.fragment = gql`
  fragment factionColumns on Faction {
    ...FactionReference
  }

  ${FactionReference.fragment}
`;

export {
  FactionReferenceColumn,
  columns as default,
};
