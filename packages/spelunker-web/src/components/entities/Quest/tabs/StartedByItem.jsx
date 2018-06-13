import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table from '../../../Table';
import itemColumns from '../../Item/columns';

const listStartedByItemForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedByItem {
        totalCount
        results {
          ...ItemReference
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const StartedByItemTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="quest.startedByItem"
      query={listStartedByItemForQuest}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={itemColumns}
        />
      )}
    </Collection>
  );
};

export default StartedByItemTab;
