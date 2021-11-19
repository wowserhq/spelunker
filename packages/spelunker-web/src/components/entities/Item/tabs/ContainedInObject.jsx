import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const ContainedInObjectTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
