import React from 'react';
import gql from 'graphql-tag';

import { Collection, Table } from '../../../core';
import areaColumns from '../../Area/columns';

const listAreasForMap = gql`
  query($id: Int!, $offset: Int) {
    map(id: $id) {
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
  const { id } = match.params;
  return (
    <Collection
      accessor="map.areas"
      query={listAreasForMap}
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
