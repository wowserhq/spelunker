import React from 'react';
import gql from 'graphql-tag';

import { Box, Collection, Table, Title } from '../../core';

import mapColumns from './columns';

const listMaps = gql`
  query($offset: Int) {
    maps(offset: $offset) {
      totalCount
      results {
        ...mapColumns
      }
    }
  }

  ${mapColumns.fragment}
`;

const MapList = () => (
  <Box>
    <Title path={['Maps']} />

    <Collection
      accessor="maps"
      query={listMaps}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={mapColumns}
        />
      )}
    </Collection>
  </Box>
);

export default MapList;
