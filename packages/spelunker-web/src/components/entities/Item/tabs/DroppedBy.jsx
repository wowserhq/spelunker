import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import npcColumns from '../../NPC/columns';
import {
  ChanceColumn,
  Collection,
  Table,
  prefixAccessors,
} from '../../../core';

const listDroppedByForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      droppedBy(offset: $offset) {
        totalCount
        results {
          chance
          npc {
            ...npcColumns
          }
        }
      }
    }
  }

  ${npcColumns.fragment}
`;

const DroppedByTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="item.droppedBy"
      query={listDroppedByForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="npc.id"
          columns={[
            ...prefixAccessors(npcColumns, 'npc'),
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default DroppedByTab;
