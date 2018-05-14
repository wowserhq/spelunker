import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import ItemReference from './Reference';

const listItems = gql`
  query($offset: Int) {
    items(offset: $offset) {
      totalCount
      results {
        ...ItemReference
      }
    }
  }

  ${ItemReference.fragment}
`;

const ItemList = () => (
  <Box>
    <Collection
      field="items"
      query={listItems}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map(item => (
              <tr key={item.id}>
                <td field="id">{item.id}</td>
                <td>
                  <ItemReference item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default ItemList;
