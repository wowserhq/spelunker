import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table from '../../../Table';
import characterColumns from '../../Character/columns';

const listCharactersForAccount = gql`
  query($id: Int!, $offset: Int) {
    account(id: $id) {
      id
      characters(offset: $offset) {
        totalCount
        results {
          ...characterColumns
        }
      }
    }
  }

  ${characterColumns.fragment}
`;

const CharactersTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="account.characters"
      query={listCharactersForAccount}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={characterColumns}
        />
      )}
    </Collection>
  );
};

export default CharactersTab;
