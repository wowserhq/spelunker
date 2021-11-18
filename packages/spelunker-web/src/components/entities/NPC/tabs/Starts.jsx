import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listStartsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      starts(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const StartsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
