import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const ContainsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
