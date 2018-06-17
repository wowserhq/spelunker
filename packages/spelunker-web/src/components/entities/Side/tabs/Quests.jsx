import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table from '../../../Table';
import questColumns from '../../Quest/columns';

const listQuestsForSide = gql`
  query($id: String!, $offset: Int!) {
    side(id: $id) {
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
      accessor="side.quests"
      query={listQuestsForSide}
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
