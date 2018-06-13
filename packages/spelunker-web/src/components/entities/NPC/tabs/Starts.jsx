import React from 'react';
import gql from 'graphql-tag';

import ClassReference from '../../Class/Reference';
import Collection from '../../../Collection';
import QuestCategory from '../../Quest/Category';
import QuestReference from '../../Quest/Reference';
import RaceReference from '../../Race/Reference';
import Table from '../../../Table';
import questColumns from '../../Quest/columns';

const listStartsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      starts(offset: $offset) {
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

const StartsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="npc.starts"
      query={listStartsForNPC}
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

export default StartsTab;
