import React from 'react';
import gql from 'graphql-tag';

import gameObjectColumns from '../../GameObject/columns';
import { Collection, Table } from '../../../core';

const listStartedByObjectForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedByObject {
        totalCount
        results {
          ...gameObjectColumns
        }
      }
    }
  }

  ${gameObjectColumns.fragment}
`;

const StartedByObjectTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="quest.startedByObject"
      query={listStartedByObjectForQuest}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={gameObjectColumns}
        />
      )}
    </Collection>
  );
};

export default StartedByObjectTab;
