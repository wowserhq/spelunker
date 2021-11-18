import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import itemColumns from '../columns';
import {
  ChanceColumn,
  Collection,
  Table,
  prefixAccessors,
} from '../../../core';

const listContainsForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      contains(offset: $offset) {
        totalCount
        results {
          chance
          item {
            ...itemColumns
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
      accessor="item.contains"
      query={listContainsForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="item.id"
          columns={[
            ...prefixAccessors(itemColumns, 'item'),
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default ContainsTab;
