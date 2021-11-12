import React from 'react';
import gql from 'graphql-tag';

import areaColumns from '../../Area/columns';
import { Collection, Table } from '../../../core';

const listAreasForSide = gql`
  query($id: String!, $offset: Int!) {
    side(id: $id) {
      id
      areas(offset: $offset) {
        totalCount
        results {
          ...areaColumns
        }
      }
    }
  }

  ${areaColumns.fragment}
`;

const AreasTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="side.areas"
      query={listAreasForSide}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={areaColumns}
        />
      )}
    </Collection>
  );
};

export default AreasTab;
