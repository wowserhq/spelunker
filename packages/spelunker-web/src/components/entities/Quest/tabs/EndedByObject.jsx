import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import GameObjectReference from '../../GameObject/Reference';
import Table from '../../../Table';

const listEndedByObjectForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      endedByObject {
        totalCount
        results {
          ...GameObjectReference
        }
      }
    }
  }

  ${GameObjectReference.fragment}
`;

const EndedByObjectTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="quest.endedByObject"
      query={listEndedByObjectForQuest}
      variables={{ id }}
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
  );
};

export default EndedByObjectTab;
