import React from 'react';
import gql from 'graphql-tag';

import npcColumns from '../../NPC/columns';
import { Collection, Table } from '../../../core';

const listStartedByForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      startedBy {
        totalCount
        results {
          ...npcColumns
        }
      }
    }
  }

  ${npcColumns.fragment}
`;

const StartedByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="quest.startedBy"
      query={listStartedByForQuest}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={npcColumns}
        />
      )}
    </Collection>
  );
};

export default StartedByTab;
