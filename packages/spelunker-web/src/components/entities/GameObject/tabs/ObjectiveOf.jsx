import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const ObjectiveOfTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
