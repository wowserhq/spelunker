import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import AccountReference from './Reference';
import CharactersTab from './tabs/Characters';

const fetchAccount = gql`
  query($id: Int!) {
    account(id: $id) {
      ...AccountReference

      characters {
        totalCount
      }
    }
  }

  ${AccountReference.fragment}
`;

const Account = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Query query={fetchAccount} variables={{ id }}>
      {({ data }) => {
        const { account } = data;
        const {
          name,

          characters: { totalCount: characterCount },
        } = account;

        return (
          <Title path={[name, 'Accounts']}>
            <Box>
              <h1>
                <AccountReference account={account} />
              </h1>
            </Box>

            <TabbedBox>
              {characterCount > 0 && <Tab
                label={`Characters (${characterCount})`}
                component={CharactersTab}
                path="characters"
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Account;
