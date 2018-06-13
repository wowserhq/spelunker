import React from 'react';
import gql from 'graphql-tag';

import ClassReference from '../../Class/Reference';
import Collection from '../../../Collection';
import QuestCategory from '../../Quest/Category';
import QuestReference from '../../Quest/Reference';
import RaceReference from '../../Race/Reference';
import Table from '../../../Table';
import questColumns from '../../Quest/columns';

const listEndsForGameObject = gql`
  query($id: Int!, $offset: Int) {
    object(id: $id) {
      id
      ends(offset: $offset) {
        totalCount
        results {
          ...QuestReference
          category {
            ...QuestCategory
          }
          classes {
            ...ClassReference
          }
          races(exclusive: true) {
            ...RaceReference
          }
        }
      }
    }
  }

  ${ClassReference.fragment}
  ${QuestCategory.fragment}
  ${QuestReference.fragment}
  ${RaceReference.fragment}
`;

const EndsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="object.ends"
      query={listEndsForGameObject}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={questColumns}
        />
      )}
    </Collection>
  );
};

export default EndsTab;
