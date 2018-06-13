import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import ClassReference from '../Class/Reference';
import Collection from '../../Collection';
import RaceReference from '../Race/Reference';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import QuestCategory from './Category';
import QuestReference from './Reference';
import questColumns from './columns';

const listQuests = gql`
  query($offset: Int) {
    quests(offset: $offset) {
      totalCount
      results {
        ...QuestReference
        category {
          ...QuestCategory
        }
        classes {
          ...ClassReference
        }
        races(exclusive: true) {
          ...RaceReference
        }
      }
    }
  }

  ${ClassReference.fragment}
  ${QuestCategory.fragment}
  ${QuestReference.fragment}
  ${RaceReference.fragment}
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
