import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table, { ChanceColumn, prefixAccessors } from '../../../Table';
import itemColumns from '../../Item/columns';

const listDropsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      drops(offset: $offset) {
        totalCount
        results {
          chance
          item {
            ...ItemReference
          }
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const DropsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="npc.drops"
      query={listDropsForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
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
