import React from 'react';
import gql from 'graphql-tag';

import ClassReference from '../../Class/Reference';
import Collection from '../../../Collection';
import QuestCategory from '../../Quest/Category';
import QuestReference from '../../Quest/Reference';
import RaceReference from '../../Race/Reference';
import Table from '../../../Table';
import questColumns from '../../Quest/columns';

const listCompletedQuestsForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      completedQuests(offset: $offset) {
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
  ${RaceReference.fragment}
  ${QuestCategory.fragment}
  ${QuestReference.fragment}
`;

const CompletedQuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="character.completedQuests"
      query={listCompletedQuestsForCharacter}
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

export default CompletedQuestsTab;
