import React from 'react';
import gql from 'graphql-tag';

import itemColumns from '../../Item/columns';
import {
  Collection,
  CurrencyColumn,
  Table,
  prefixAccessors,
} from '../../../core';

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
            ...itemColumns
            buyPrice
            sellPrice
          }
        }
      }
    }
  }

  ${itemColumns.fragment}
`;

const SellsTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="npc.sells"
      query={listSellsForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="item.id"
          columns={[
            ...prefixAccessors(itemColumns, 'item'),
            <CurrencyColumn label="Cost" accessor="item.buyPrice" />,
            <CurrencyColumn label="Sells for" accessor="item.sellPrice" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default SellsTab;
