import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

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

const Account = ({ match }) => {
  const { id } = match.params;
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
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Account;
