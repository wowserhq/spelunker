import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listObjectiveOfForGameObject = gql`
  query($id: Int!, $offset: Int) {
    object(id: $id) {
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
      accessor="object.objectiveOf"
      query={listObjectiveOfForGameObject}
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
