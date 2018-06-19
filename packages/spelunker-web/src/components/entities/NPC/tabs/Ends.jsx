import React from 'react';
import gql from 'graphql-tag';

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

const EndsTab = ({ match }) => {
  const { id } = match.params;
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
