import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';
import areaColumns from '../Area/columns';

import AreaReference from './Reference';

const listAreas = gql`
  query($offset: Int) {
    areas(offset: $offset) {
      totalCount
      results {
        ...AreaReference
      }
    }
  }

  ${AreaReference.fragment}
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
