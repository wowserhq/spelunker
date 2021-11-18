import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const StartedByTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
