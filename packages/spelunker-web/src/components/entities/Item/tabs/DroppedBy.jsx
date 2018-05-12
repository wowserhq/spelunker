import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import NPCReference from '../../NPC/Reference';
import Table from '../../../Table';
import percent from '../../../formatters/percent';

const listDroppedByForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      droppedBy(offset: $offset) {
        totalCount
        results {
          chance
          npc {
            ...NPCReference
          }
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const DroppedByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="item.droppedBy"
      query={listDroppedByForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Chance</th>
              <th>NPC</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ chance, npc }) => (
              <tr key={npc.id}>
                <td>{percent(chance)}</td>
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

export default DroppedByTab;
