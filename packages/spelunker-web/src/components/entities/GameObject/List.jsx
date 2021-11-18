import React from 'react';
import { gql } from '@apollo/client';

import { Box, Collection, Table, Title } from '../../core';

import gameObjectColumns from './columns';

const listGameObjects = gql`
  query($offset: Int) {
    objects(offset: $offset) {
      totalCount
      results {
        ...gameObjectColumns
      }
    }
  }

  ${gameObjectColumns.fragment}
`;

const GameObjectList = () => (
  <Box>
    <Title path={['Objects']} />

    <Collection
      accessor="objects"
      query={listGameObjects}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={gameObjectColumns}
        />
      )}
    </Collection>
  </Box>
);

export default GameObjectList;
