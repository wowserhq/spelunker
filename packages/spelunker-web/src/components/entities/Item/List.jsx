import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import ItemReference from './Reference';
import itemColumns from './columns';

const listItems = gql`
  query($offset: Int) {
    items(offset: $offset) {
      totalCount
      results {
        ...ItemReference
      }
    }
  }

  ${ItemReference.fragment}
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
