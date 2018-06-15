import React from 'react';
import gql from 'graphql-tag';

import AccountReference from '../Reference';
import { IDColumn, PlaceholderColumn } from '../../../Table';

import AccountReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <AccountReferenceColumn />,
  <PlaceholderColumn label="Online" />,
  <PlaceholderColumn label="Last online" />,
  <PlaceholderColumn label="OS" />,
];

columns.fragment = gql`
  fragment accountColumns on Account {
    ...AccountReference
  }

  ${AccountReference.fragment}
`;

export {
  AccountReferenceColumn,
  columns as default,
};
