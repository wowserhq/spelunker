import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import NPCReference from '../../NPC/Reference';
import Table from '../../../Table';

const listNPCSpawnsForMap = gql`
  query($id: Int!, $offset: Int) {
    map(id: $id) {
      id
      npcSpawns(offset: $offset) {
        totalCount
        results {
          id
          x
          y
          z
          npc {
            ...NPCReference
          }
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const NPCSpawnsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="map.npcSpawns"
      query={listNPCSpawnsForMap}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>NPC</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ id, npc, x, y, z }) => (
              <tr key={id}>
                <td>
                  <NPCReference npc={npc} />
                </td>
                <td>{x}</td>
                <td>{y}</td>
                <td>{z}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default NPCSpawnsTab;
