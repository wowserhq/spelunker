import React from 'react';

import { IDColumn, PlaceholderColumn } from '../../../Table';

import RaceReferenceColumn from './ReferenceColumn';

export default [
  <IDColumn />,
  <RaceReferenceColumn />,
  <PlaceholderColumn label="Side" />,
];

export {
  RaceReferenceColumn,
};
