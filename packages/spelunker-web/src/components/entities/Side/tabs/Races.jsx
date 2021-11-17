import React from 'react';
import { useParams } from 'react-router-dom';
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

const RacesTab = () => {
  const params = useParams();
  const { id } = params;
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
