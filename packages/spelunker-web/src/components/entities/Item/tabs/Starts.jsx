import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listStartsForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      starts(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const StartsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="item.starts"
      query={listStartsForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={questColumns}
        />
      )}
    </Collection>
  );
};

export default StartsTab;
