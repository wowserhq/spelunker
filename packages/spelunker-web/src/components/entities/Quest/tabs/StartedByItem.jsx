import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table from '../../../Table';

const listStartedByItemForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedByItem {
        totalCount
        results {
          ...ItemReference
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const StartedByItemTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="quest.startedByItem"
      query={listStartedByItemForQuest}
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
  );
};

export default StartedByItemTab;
