import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table, { ChanceColumn, prefixAccessors } from '../../../Table';
import gameObjectColumns from '../../GameObject/columns';

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
  const { id } = match.params;
  return (
    <Collection
      accessor="item.containedInObject"
      query={listContainedInObjectForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
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
