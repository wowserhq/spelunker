import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Currency from '../../../formatters/Currency';
import ItemReference from '../../Item/Reference';
import Table from '../../../Table';

const listSellsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      sells(offset: $offset) {
        totalCount
        results {
          maxCount
          restockTime
          item {
            ...ItemReference
            buyPrice
            sellPrice
          }
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const SellsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="npc.sells"
      query={listSellsForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
              <th>Sells for</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ item }) => (
              <tr key={item.id}>
                <td>
                  <ItemReference item={item} />
                </td>
                <td>
                  <Currency value={item.buyPrice} />
                </td>
                <td>
                  <Currency value={item.sellPrice} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default SellsTab;
