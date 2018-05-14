import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import NPCReference from '../../NPC/Reference';
import Table from '../../../Table';

const listStartedByForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedBy {
        totalCount
        results {
          ...NPCReference
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const StartedByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="quest.startedBy"
      query={listStartedByForQuest}
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

export default StartedByTab;
