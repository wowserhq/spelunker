import React from 'react';
import gql from 'graphql-tag';

import { Box, Collection, Table, Title } from '../../core';

import itemColumns from './columns';

const listItems = gql`
  query($offset: Int) {
    items(offset: $offset) {
      totalCount
      results {
        ...itemColumns
      }
    }
  }

  ${itemColumns.fragment}
`;

const ItemList = () => (
  <Box>
    <Title path={['Items']} />

    <Collection
      accessor="items"
      query={listItems}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={itemColumns}
        />
      )}
    </Collection>
  </Box>
);

export default ItemList;
