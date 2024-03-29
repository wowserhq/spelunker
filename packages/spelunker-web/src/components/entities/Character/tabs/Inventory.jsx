import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import itemColumns from '../../Item/columns';
import { Collection, Column, Table, prefixAccessors } from '../../../core';

const listInventoryForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      inventory(offset: $offset) {
        totalCount
        results {
          id
          count
          item {
            ...itemColumns
          }
        }
      }
    }
  }

  ${itemColumns.fragment}
`;

const InventoryTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="character.inventory"
      query={listInventoryForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            ...prefixAccessors(itemColumns, 'item'),
            <Column id="count" label="Count" accessor="count" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default InventoryTab;
