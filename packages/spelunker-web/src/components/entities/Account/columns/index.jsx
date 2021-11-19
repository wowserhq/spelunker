import React from 'react';
import { gql } from '@apollo/client';

import AccountReference from '../Reference';
import { IDColumn, PlaceholderColumn } from '../../../core';

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
