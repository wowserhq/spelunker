import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listObjectiveOfForFaction = gql`
  query($id: Int!, $offset: Int) {
    faction(id: $id) {
      id
      objectiveOf(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const ObjectiveOfTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="faction.objectiveOf"
      query={listObjectiveOfForFaction}
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

export default ObjectiveOfTab;
