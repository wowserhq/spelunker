import React from 'react';
import gql from 'graphql-tag';

import itemColumns from '../../Item/columns';
import { ChanceColumn, Collection, Table } from '../../../core';

const listContainsForGameObject = gql`
  query($id: Int!, $offset: Int) {
    object(id: $id) {
      id
      contains(offset: $offset) {
        totalCount
        results {
          chance
          item {
            ...itemColumns,
          }
        }
      }
    }
  }

  ${itemColumns.fragment}
`;

const ContainsTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="object.contains"
      query={listContainsForGameObject}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="item.id"
          columns={[
            ...itemColumns,
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default ContainsTab;
