import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table from '../../../Table';

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
      field="character.inventory"
      query={listInventoryForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Item</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ id, item, count }) => (
              <tr key={id}>
                <td field="id">{item.id}</td>
                <td>
                  <ItemReference item={item} />
                </td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default InventoryTab;
