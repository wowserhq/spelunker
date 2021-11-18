import React from 'react';
import { useParams } from 'react-router-dom';
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

const AreasTab = () => {
  const params = useParams();
  const { id } = params;
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
