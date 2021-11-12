import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

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
  const id = parseInt(match.params.id, 10);
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
