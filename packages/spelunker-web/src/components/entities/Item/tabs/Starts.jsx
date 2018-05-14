import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import QuestReference from '../../Quest/Reference';
import Table from '../../../Table';

const listStartsForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
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
      field="item.starts"
      query={listStartsForItem}
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
