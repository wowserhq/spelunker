import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listObjectiveOfForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
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
      accessor="item.objectiveOf"
      query={listObjectiveOfForItem}
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
