import React from 'react';
import { gql } from '@apollo/client';

import NPCReference from '../Reference';
import { IDColumn, PlaceholderColumn } from '../../../core';

import NPCReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <NPCReferenceColumn />,
  <PlaceholderColumn label="Level" />,
  <PlaceholderColumn label="React" />,
];

columns.fragment = gql`
  fragment npcColumns on NPC {
    ...NPCReference
  }

  ${NPCReference.fragment}
`;

export {
  NPCReferenceColumn,
  columns as default,
};
