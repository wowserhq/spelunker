import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listRewardFromForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      rewardFrom(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const RewardFromTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="item.rewardFrom"
      query={listRewardFromForItem}
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

export default RewardFromTab;
