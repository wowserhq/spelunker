import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

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
