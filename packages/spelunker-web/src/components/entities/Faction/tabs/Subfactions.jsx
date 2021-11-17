import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import factionColumns from '../columns';
import { Collection, Table } from '../../../core';

const listSubfactionsForFaction = gql`
  query($id: Int!) {
    faction(id: $id) {
      id
      subfactions {
        totalCount
        results {
          ...factionColumns
        }
      }
    }
  }

  ${factionColumns.fragment}
`;

const SubfactionsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="faction.subfactions"
      query={listSubfactionsForFaction}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={factionColumns}
        />
      )}
    </Collection>
  );
};

export default SubfactionsTab;
