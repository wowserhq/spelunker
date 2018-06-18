import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table from '../../../Table';
import questColumns from '../../Quest/columns';

const listQuestsForRace = gql`
  query($id: Int!, $offset: Int!) {
    race(id: $id) {
      id
      quests(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const QuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="race.quests"
      query={listQuestsForRace}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={questColumns}
        />
      )}
    </Collection>
  );
};

export default QuestsTab;
