import React from 'react';

import { IDColumn, PlaceholderColumn } from '../../../Table';

import NPCReferenceColumn from './ReferenceColumn';

export default [
  <IDColumn />,
  <NPCReferenceColumn />,
  <PlaceholderColumn label="Level" />,
  <PlaceholderColumn label="React" />,
];

export {
  NPCReferenceColumn,
};
