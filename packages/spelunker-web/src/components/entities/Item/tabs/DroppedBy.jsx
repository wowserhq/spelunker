import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table, { ChanceColumn, prefixAccessors } from '../../../Table';
import npcColumns from '../../NPC/columns';

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
  const { id } = match.params;
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
