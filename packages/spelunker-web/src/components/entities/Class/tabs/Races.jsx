import React from 'react';
import gql from 'graphql-tag';

import raceColumns from '../../Race/columns';
import { Collection, Table } from '../../../core';

const listRacesForClass = gql`
  query($id: Int!, $offset: Int!) {
    class(id: $id) {
      id
      races(offset: $offset) {
        totalCount
        results {
          ...raceColumns
        }
      }
    }
  }

  ${raceColumns.fragment}
`;

const RacesTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="class.races"
      query={listRacesForClass}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={raceColumns}
        />
      )}
    </Collection>
  );
};

export default RacesTab;
