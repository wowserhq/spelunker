import React from 'react';
import { gql } from '@apollo/client';

import GameObjectReference from '../Reference';
import { Column, IDColumn } from '../../../core';
import { humanize } from '../../../../utils/inflector';

import GameObjectReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <GameObjectReferenceColumn />,
  <Column label="Type" accessor="type">
    {(value) => humanize(value)}
  </Column>,
];

columns.fragment = gql`
  fragment gameObjectColumns on GameObject {
    ...GameObjectReference
    type
  }

  ${GameObjectReference.fragment}
`;

export {
  GameObjectReferenceColumn,
  columns as default,
};
