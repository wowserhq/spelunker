import React from 'react';
import { gql } from '@apollo/client';

import { Box, Collection, Table, Title } from '../../core';

import itemSetColumns from './columns';

const listItemSets = gql`
  query($offset: Int) {
    itemSets(offset: $offset) {
      totalCount
      results {
        ...itemSetColumns
      }
    }
  }

  ${itemSetColumns.fragment}
`;

const ItemSetList = () => (
  <Box>
    <Title path={['Item Sets']} />

    <Collection
      accessor="itemSets"
      query={listItemSets}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={itemSetColumns}
        />
      )}
    </Collection>
  </Box>
);

export default ItemSetList;
