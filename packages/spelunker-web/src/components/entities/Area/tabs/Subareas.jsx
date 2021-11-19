import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import areaColumns from '../columns';
import { Collection, Table } from '../../../core';

const listSubareasForArea = gql`
  query($id: Int!, $offset: Int!) {
    area(id: $id) {
      id
      subareas(offset: $offset) {
        totalCount
        results {
          ...areaColumns
        }
      }
    }
  }

  ${areaColumns.fragment}
`;

const SubareasTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="area.subareas"
      query={listSubareasForArea}
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

export default SubareasTab;
