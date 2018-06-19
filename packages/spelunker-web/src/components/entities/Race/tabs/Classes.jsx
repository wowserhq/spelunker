import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table from '../../../Table';
import classColumns from '../../Class/columns';

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

const ClassesTab = ({ match }) => {
  const { id } = match.params;
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
