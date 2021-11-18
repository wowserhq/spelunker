import React from 'react';
import { gql } from '@apollo/client';

import { Box, Collection, Table, Title } from '../../core';

import areaColumns from './columns';

const listAreas = gql`
  query($offset: Int) {
    areas(offset: $offset) {
      totalCount
      results {
        ...areaColumns
      }
    }
  }

  ${areaColumns.fragment}
`;

const AreaList = () => (
  <Box>
    <Title path={['Areas']} />

    <Collection
      accessor="areas"
      query={listAreas}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={areaColumns}
        />
      )}
    </Collection>
  </Box>
);

export default AreaList;
