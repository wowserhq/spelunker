import React from 'react';

import { IDColumn, PlaceholderColumn } from '../../../Table';

import AccountReferenceColumn from './ReferenceColumn';

export default [
  <IDColumn />,
  <AccountReferenceColumn />,
  <PlaceholderColumn label="Online" />,
  <PlaceholderColumn label="Last online" />,
  <PlaceholderColumn label="OS" />,
];

export {
  AccountReferenceColumn,
};
