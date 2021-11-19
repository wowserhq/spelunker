import React from 'react';
import { gql } from '@apollo/client';

import { Box, Collection, Table, Title } from '../../core';

import factionColumns from './columns';

const listFactions = gql`
  query($offset: Int) {
    factions(offset: $offset) {
      totalCount
      results {
        ...factionColumns
      }
    }
  }

  ${factionColumns.fragment}
`;

const FactionList = () => (
  <Box>
    <Title path={['Factions']} />

    <Collection
      accessor="factions"
      query={listFactions}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={factionColumns}
        />
      )}
    </Collection>
  </Box>
);

export default FactionList;
