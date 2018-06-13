import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import GameObjectReference from '../../GameObject/Reference';
import Table from '../../../Table';
import gameObjectColumns from '../../GameObject/columns';

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
