import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table, { ChanceColumn, prefixAccessors } from '../../../Table';
import itemColumns from '../../Item/columns';

const listContainedInForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      containedIn(offset: $offset) {
        totalCount
        results {
          chance
          container {
            ...ItemReference
          }
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const ContainedInTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="item.containedIn"
      query={listContainedInForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            ...prefixAccessors(itemColumns, 'container'),
            <ChanceColumn />,
          ]}
        />
      )}
    </Collection>
  );
};

export default ContainedInTab;
