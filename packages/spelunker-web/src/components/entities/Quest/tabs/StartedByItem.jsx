import React from 'react';
import gql from 'graphql-tag';

import itemColumns from '../../Item/columns';
import { Collection, Table } from '../../../core';

const listStartedByItemForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedByItem {
        totalCount
        results {
          ...itemColumns
        }
      }
    }
  }

  ${itemColumns.fragment}
`;

const StartedByItemTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
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
