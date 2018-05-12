import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table from '../../../Table';
import percent from '../../../formatters/percent';

const listContainsForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      contains(offset: $offset) {
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

const ContainsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="item.contains"
      query={listContainsForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Chance</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ chance, item }) => (
              <tr key={item.id}>
                <td>{percent(chance)}</td>
                <td>
                  <ItemReference item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default ContainsTab;
