import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listExclusiveQuestsForClass = gql`
  query($id: Int!, $offset: Int!) {
    class(id: $id) {
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

const ExclusiveQuestsTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="class.exclusiveQuests"
      query={listExclusiveQuestsForClass}
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
