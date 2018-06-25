import React from 'react';
import gql from 'graphql-tag';

import questColumns from '../../Quest/columns';
import { Collection, Table } from '../../../core';

const listRewardFromForSpell = gql`
  query($id: Int!, $offset: Int) {
    spell(id: $id) {
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
  const { id } = match.params;
  return (
    <Collection
      accessor="spell.rewardFrom"
      query={listRewardFromForSpell}
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
