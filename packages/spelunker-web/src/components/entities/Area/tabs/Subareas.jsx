import React from 'react';
import gql from 'graphql-tag';

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

const SubareasTab = ({ match }) => {
  const { id } = match.params;
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
