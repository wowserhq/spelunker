import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import MapReference from '../../Map/Reference';
import Table from '../../../Table';

const listSpawnsForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      spawns(offset: $offset) {
        totalCount
        results {
          id
          map {
            ...MapReference
          }
          x
          y
          z
        }
      }
    }
  }

  ${MapReference.fragment}
`;

const SpawnsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="npc.spawns"
      query={listSpawnsForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Map</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ id, map, x, y, z }) => (
              <tr key={id}>
                <td>
                  <MapReference map={map} />
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

export default SpawnsTab;
