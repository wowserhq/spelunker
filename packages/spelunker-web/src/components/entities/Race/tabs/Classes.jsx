import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import classColumns from '../../Class/columns';
import { Collection, Table } from '../../../core';

const listClassesForRace = gql`
  query($id: Int!, $offset: Int!) {
    race(id: $id) {
      id
      classes(offset: $offset) {
        totalCount
        results {
          ...classColumns
        }
      }
    }
  }

  ${classColumns.fragment}
`;

const ClassesTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="race.classes"
      query={listClassesForRace}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={classColumns}
        />
      )}
    </Collection>
  );
};

export default ClassesTab;
