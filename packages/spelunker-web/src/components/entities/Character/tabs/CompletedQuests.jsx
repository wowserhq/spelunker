import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import QuestReference from '../../Quest/Reference';
import Table from '../../../Table';

const listCompletedQuestsForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      completedQuests(offset: $offset) {
        totalCount
        results {
          ...QuestReference
        }
      }
    }
  }

  ${QuestReference.fragment}
`;

const CompletedQuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="character.completedQuests"
      query={listCompletedQuestsForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Quest</th>
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

export default CompletedQuestsTab;
