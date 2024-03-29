import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const StartedByItemTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
