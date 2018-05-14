import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import GameObjectReference from './Reference';

const listGameObjects = gql`
  query($offset: Int) {
    objects(offset: $offset) {
      totalCount
      results {
        ...GameObjectReference
      }
    }
  }

  ${GameObjectReference.fragment}
`;

const GameObjectList = () => (
  <Box>
    <Collection
      field="objects"
      query={listGameObjects}
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
            {results.map(object => (
              <tr key={object.id}>
                <td field="id">{object.id}</td>
                <td>
                  <GameObjectReference object={object} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default GameObjectList;
