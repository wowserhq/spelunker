import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import CharactersTab from './tabs/Characters';

const fetchAccount = gql`
  query($id: Int!) {
    account(id: $id) {
      id
      name
      characters {
        totalCount
      }
    }
  }
`;

const Account = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchAccount} variables={{ id }}>
      {({ data }) => {
        const { account: {
          characters: { totalCount: characterCount },
        } } = data;

        return (
          <div>
            <Box>
              <legend>{data.account.name}</legend>
            </Box>

            <TabbedBox>
              {characterCount > 0 && <Tab
                label={`Characters (${characterCount})`}
                component={CharactersTab}
                path="characters"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default Account;
