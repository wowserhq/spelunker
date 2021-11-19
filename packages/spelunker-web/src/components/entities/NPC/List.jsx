import React from 'react';
import { gql } from '@apollo/client';

import { Box, Collection, Table, Title } from '../../core';

import npcColumns from './columns';

const listNPCs = gql`
  query($offset: Int) {
    npcs(offset: $offset) {
      totalCount
      results {
        ...npcColumns
      }
    }
  }

  ${npcColumns.fragment}
`;

const NPCList = () => (
  <Box>
    <Title path={['NPCs']} />

    <Collection
      accessor="npcs"
      query={listNPCs}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={npcColumns}
        />
      )}
    </Collection>
  </Box>
);

export default NPCList;
