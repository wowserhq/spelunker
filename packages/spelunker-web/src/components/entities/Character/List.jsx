import React from 'react';
import gql from 'graphql-tag';

import { Box, Collection, Table, Title } from '../../core';

import characterColumns from './columns';

const listCharacters = gql`
  query($offset: Int) {
    characters(offset: $offset) {
      totalCount
      results {
        ...characterColumns
      }
    }
  }

  ${characterColumns.fragment}
`;

const CharacterList = () => (

  <Box>
    <Title path={['Characters']} />

    <Collection
      accessor="characters"
      query={listCharacters}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={characterColumns}
        />
      )}
    </Collection>
  </Box>
);

export default CharacterList;
