import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import QuestReference from '../../Quest/Reference';
import Table from '../../../Table';

const listCurrentQuestsForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      currentQuests(offset: $offset) {
        totalCount
        results {
          status
          quest {
            ...QuestReference
          }
        }
      }
    }
  }

  ${QuestReference.fragment}
`;

const CurrentQuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="character.currentQuests"
      query={listCurrentQuestsForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Quest</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ status, quest }) => (
              <tr key={quest.id}>
                <td field="id">{quest.id}</td>
                <td>
                  <QuestReference quest={quest} />
                </td>
                <td>{status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default CurrentQuestsTab;
