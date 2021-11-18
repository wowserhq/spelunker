import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listExclusiveQuestsForRace = gql`
  query($id: Int!, $offset: Int!) {
    race(id: $id) {
      id
      exclusiveQuests: quests(offset: $offset, exclusive: true) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const ExclusiveQuestsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="race.exclusiveQuests"
      query={listExclusiveQuestsForRace}
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

export default ExclusiveQuestsTab;
