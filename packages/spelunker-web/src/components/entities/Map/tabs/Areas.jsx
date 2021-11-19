import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const AreasTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
