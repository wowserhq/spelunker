import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import NPCReference from './Reference';

const listNPCs = gql`
  query($offset: Int) {
    npcs(offset: $offset) {
      totalCount
      results {
        ...NPCReference
      }
    }
  }

  ${NPCReference.fragment}
`;

const NPCList = () => (
  <Box>
    <Collection
      field="npcs"
      query={listNPCs}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map(npc => (
              <tr key={npc.id}>
                <td>{npc.id}</td>
                <td>
                  <NPCReference npc={npc} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default NPCList;
