import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import AccountReference from './Reference';

const listAccounts = gql`
  query($offset: Int) {
    accounts(offset: $offset) {
      totalCount
      results {
        ...AccountReference
      }
    }
  }

  ${AccountReference.fragment}
`;

const AccountList = () => (
  <Box>
    <Collection
      field="accounts"
      query={listAccounts}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map(account => (
              <tr key={account.id}>
                <td field="id">{account.id}</td>
                <td>
                  <AccountReference account={account} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default AccountList;
