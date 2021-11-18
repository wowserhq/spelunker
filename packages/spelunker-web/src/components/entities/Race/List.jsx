import React from 'react';
import { gql } from '@apollo/client';

import { Box, Collection, Table, Title } from '../../core';

import raceColumns from './columns';

const listRaces = gql`
  query($offset: Int) {
    races(offset: $offset) {
      totalCount
      results {
        ...raceColumns
      }
    }
  }

  ${raceColumns.fragment}
`;

const RaceList = () => (
  <Box>
    <Title path={['Races']} />

    <Collection
      accessor="races"
      query={listRaces}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={raceColumns}
        />
      )}
    </Collection>
  </Box>
);

export default RaceList;
