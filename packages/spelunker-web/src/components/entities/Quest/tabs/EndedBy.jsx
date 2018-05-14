import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import NPCReference from '../../NPC/Reference';
import Table from '../../../Table';

const listEndedByForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      endedBy {
        totalCount
        results {
          ...NPCReference
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const EndedByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="quest.endedBy"
      query={listEndedByForQuest}
      variables={{ id }}
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
            {results.map(npc => (
              <tr key={npc.id}>
                <td field="id">{npc.id}</td>
                <td>
                  <NPCReference npc={npc} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default EndedByTab;
