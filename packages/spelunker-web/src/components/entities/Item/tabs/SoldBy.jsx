import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Currency from '../../../formatters/Currency';
import NPCReference from '../../NPC/Reference';
import Table from '../../../Table';

const listSoldByForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      buyPrice
      sellPrice
      soldBy(offset: $offset) {
        totalCount
        results {
          maxCount
          restockTime
          npc {
            ...NPCReference
          }
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const SoldByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="item.soldBy"
      query={listSoldByForItem}
      variables={{ id }}
    >
      {({ data, results }) => (
        <Table>
          <thead>
            <tr>
              <th>NPC</th>
              <th>Cost</th>
              <th>Sells for</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ npc }) => (
              <tr key={npc.id}>
                <td>
                  <NPCReference npc={npc} />
                </td>
                <td>
                  <Currency value={data.item.buyPrice} />
                </td>
                <td>
                  <Currency value={data.item.sellPrice} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default SoldByTab;
