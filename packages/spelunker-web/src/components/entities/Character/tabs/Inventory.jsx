import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table, { Column, prefixAccessors } from '../../../Table';
import itemColumns from '../../Item/columns';

const listInventoryForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      inventory(offset: $offset) {
        totalCount
        results {
          id
          count
          item {
            ...ItemReference
          }
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const InventoryTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="character.inventory"
      query={listInventoryForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            ...prefixAccessors(itemColumns, 'item'),
            <Column id="count" label="Count" accessor="count" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default InventoryTab;
