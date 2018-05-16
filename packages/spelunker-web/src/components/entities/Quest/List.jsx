import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import QuestReference from './Reference';

const listQuests = gql`
  query($offset: Int) {
    quests(offset: $offset) {
      totalCount
      results {
        ...QuestReference
      }
    }
  }

  ${QuestReference.fragment}
`;

const QuestList = () => (
  <Box>
    <Title path={['Quests']} />

    <Collection
      field="quests"
      query={listQuests}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map(quest => (
              <tr key={quest.id}>
                <td field="id">{quest.id}</td>
                <td>
                  <QuestReference quest={quest} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default QuestList;
