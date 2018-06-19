import React from 'react';
import gql from 'graphql-tag';

import { Box, Collection, Table, Title } from '../../core';

import accountColumns from './columns';

const listAccounts = gql`
  query($offset: Int) {
    accounts(offset: $offset) {
      totalCount
      results {
        ...accountColumns
      }
    }
  }

  ${accountColumns.fragment}
`;

const AccountList = () => (
  <Box>
    <Title path={['Accounts']} />

    <Collection
      accessor="accounts"
      query={listAccounts}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={accountColumns}
        />
      )}
    </Collection>
  </Box>
);

export default AccountList;
