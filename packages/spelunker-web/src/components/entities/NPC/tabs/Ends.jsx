import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listEndsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      ends(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const EndsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="npc.ends"
      query={listEndsForNPC}
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
