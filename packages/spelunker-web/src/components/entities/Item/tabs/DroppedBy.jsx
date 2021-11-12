import React from 'react';
import gql from 'graphql-tag';

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

const DroppedByTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
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
