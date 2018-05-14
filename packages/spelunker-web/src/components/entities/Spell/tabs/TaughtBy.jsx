import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Currency from '../../../formatters/Currency';
import NPCReference from '../../NPC/Reference';
import Table from '../../../Table';

const listTaughtByForSpell = gql`
  query($id: Int!, $offset: Int) {
    spell(id: $id) {
      id
      taughtBy(offset: $offset) {
        totalCount
        results {
          cost
          npc {
            ...NPCReference
          }
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const TaughtByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="spell.taughtBy"
      query={listTaughtByForSpell}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>NPC</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ cost, npc }) => (
              <tr key={npc.id}>
                <td field="id">{npc.id}</td>
                <td>
                  <NPCReference npc={npc} />
                </td>
                <td>
                  <Currency value={cost} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default TaughtByTab;
