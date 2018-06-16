import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table from '../../../Table';
import raceColumns from '../../Race/columns';

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
  const { id } = match.params;
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
