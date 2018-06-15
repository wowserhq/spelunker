import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import questColumns from './columns';

const listQuests = gql`
  query($offset: Int) {
    quests(offset: $offset) {
      totalCount
      results {
        ...questColumns
      }
    }
  }

  ${questColumns.fragment}
`;

const QuestList = () => (
  <Box>
    <Title path={['Quests']} />

    <Collection
      accessor="quests"
      query={listQuests}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={questColumns}
        />
      )}
    </Collection>
  </Box>
);

export default QuestList;
