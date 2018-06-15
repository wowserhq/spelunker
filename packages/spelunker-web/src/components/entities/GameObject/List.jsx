import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

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
