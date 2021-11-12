import React from 'react';
import gql from 'graphql-tag';

import raceColumns from '../../Race/columns';
import { Collection, Table } from '../../../core';

const listRacesForSide = gql`
  query($id: String!) {
    side(id: $id) {
      id
      races {
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
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="side.races"
      query={listRacesForSide}
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
