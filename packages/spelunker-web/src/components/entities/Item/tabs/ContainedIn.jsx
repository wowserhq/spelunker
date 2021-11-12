import React from 'react';
import gql from 'graphql-tag';

import itemColumns from '../columns';
import {
  ChanceColumn,
  Collection,
  Table,
  prefixAccessors,
} from '../../../core';

const listContainedInForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      containedIn(offset: $offset) {
        totalCount
        results {
          chance
          container {
            ...itemColumns
          }
        }
      }
    }
  }

  ${itemColumns.fragment}
`;

const ContainedInTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="item.containedIn"
      query={listContainedInForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="container.id"
          columns={[
            ...prefixAccessors(itemColumns, 'container'),
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default ContainedInTab;
