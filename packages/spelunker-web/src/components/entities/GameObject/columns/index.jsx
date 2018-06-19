import React from 'react';
import gql from 'graphql-tag';

import GameObjectReference from '../Reference';
import { IDColumn } from '../../../core';

import GameObjectReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <GameObjectReferenceColumn />,
];

columns.fragment = gql`
  fragment gameObjectColumns on GameObject {
    ...GameObjectReference
  }

  ${GameObjectReference.fragment}
`;

export {
  GameObjectReferenceColumn,
  columns as default,
};
