import React from 'react';
import gql from 'graphql-tag';

import gameObjectColumns from '../../GameObject/columns';
import {
  ChanceColumn,
  Collection,
  Table,
  prefixAccessors,
} from '../../../core';

const listContainedInObjectForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      containedInObject(offset: $offset) {
        totalCount
        results {
          chance
          object {
            ...gameObjectColumns
          }
        }
      }
    }
  }

  ${gameObjectColumns.fragment}
`;

const ContainedInObjectTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="item.containedInObject"
      query={listContainedInObjectForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="object.id"
          columns={[
            ...prefixAccessors(gameObjectColumns, 'object'),
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default ContainedInObjectTab;
