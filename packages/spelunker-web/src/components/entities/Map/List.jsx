import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import MapReference from './Reference';
import mapColumns from './columns';

const listMaps = gql`
  query($offset: Int) {
    maps(offset: $offset) {
      totalCount
      results {
        ...MapReference
      }
    }
  }

  ${MapReference.fragment}
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
