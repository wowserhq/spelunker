import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import npcColumns from '../../NPC/columns';
import { Collection, Table } from '../../../core';

const listEndedByForQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      endedBy {
        totalCount
        results {
          ...npcColumns
        }
      }
    }
  }

  ${npcColumns.fragment}
`;

const EndedByTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="quest.endedBy"
      query={listEndedByForQuest}
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

export default EndedByTab;
