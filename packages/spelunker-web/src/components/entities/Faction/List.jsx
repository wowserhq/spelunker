import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

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
