import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import GameObjectReference from '../../GameObject/Reference';
import Table from '../../../Table';

const listStartedByObjectForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedByObject {
        totalCount
        results {
          ...GameObjectReference
        }
      }
    }
  }

  ${GameObjectReference.fragment}
`;

const StartedByObjectTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="quest.startedByObject"
      query={listStartedByObjectForQuest}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map(object => (
              <tr key={object.id}>
                <td>{object.id}</td>
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

export default StartedByObjectTab;
