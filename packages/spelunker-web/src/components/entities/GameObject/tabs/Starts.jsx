import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import QuestReference from '../../Quest/Reference';
import Table from '../../../Table';

const listStartsForGameObject = gql`
  query($id: Int!, $offset: Int) {
    object(id: $id) {
      id
      starts(offset: $offset) {
        totalCount
        results {
          ...QuestReference
        }
      }
    }
  }

  ${QuestReference.fragment}
`;

const StartsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="object.starts"
      query={listStartsForGameObject}
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
            {results.map(quest => (
              <tr key={quest.id}>
                <td field="id">{quest.id}</td>
                <td>
                  <QuestReference quest={quest} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default StartsTab;
