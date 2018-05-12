import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import GameObjectReference from '../../GameObject/Reference';
import Table from '../../../Table';

const listObjectSpawnsForMap = gql`
  query($id: Int!, $offset: Int) {
    map(id: $id) {
      id
      objectSpawns(offset: $offset) {
        totalCount
        results {
          id
          x
          y
          z
          object {
            ...GameObjectReference
          }
        }
      }
    }
  }

  ${GameObjectReference.fragment}
`;

const GameObjectSpawnsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="map.objectSpawns"
      query={listObjectSpawnsForMap}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Object</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ id, object, x, y, z }) => (
              <tr key={id}>
                <td>
                  <GameObjectReference object={object} />
                </td>
                <td>{x}</td>
                <td>{y}</td>
                <td>{z}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default GameObjectSpawnsTab;
