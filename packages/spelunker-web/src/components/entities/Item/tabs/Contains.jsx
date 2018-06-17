import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table, { ChanceColumn, prefixAccessors } from '../../../Table';
import itemColumns from '../columns';

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

const ContainsTab = ({ match }) => {
  const { id } = match.params;
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
