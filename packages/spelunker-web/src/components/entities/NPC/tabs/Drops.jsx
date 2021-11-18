import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import itemColumns from '../../Item/columns';
import {
  ChanceColumn,
  Collection,
  Table,
  prefixAccessors,
} from '../../../core';

const listDropsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      drops(offset: $offset) {
        totalCount
        results {
          chance
          item {
            ...itemColumns
          }
        }
      }
    }
  }

  ${itemColumns.fragment}
`;

const DropsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="npc.drops"
      query={listDropsForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="item.id"
          columns={[
            ...prefixAccessors(itemColumns, 'item'),
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default DropsTab;
