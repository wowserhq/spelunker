import React from 'react';
import { gql } from '@apollo/client';

import AreaReference from '../Area/Reference';

const QuestCategory = ({ category }) => {
  if (!category) {
    return null;
  }
  if (category.__typename === 'Area') {
    return <AreaReference area={category} />;
  }
  return (
    <span>{category.name}</span>
  );
};

QuestCategory.fragment = gql`
  fragment QuestCategory on QuestCategory {
    ... on QuestSort {
      id
      name
    }
    ... on Area {
      ...AreaReference
    }
  }

  ${AreaReference.fragment}
`;

export default QuestCategory;
