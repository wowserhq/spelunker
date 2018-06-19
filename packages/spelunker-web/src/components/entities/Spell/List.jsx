import React from 'react';
import gql from 'graphql-tag';

import { Box, Collection, Table, Title } from '../../core';

import spellColumns from './columns';

const listSpells = gql`
  query($offset: Int) {
    spells(offset: $offset) {
      totalCount
      results {
        ...spellColumns
      }
    }
  }

  ${spellColumns.fragment}
`;

const SpellList = () => (
  <Box>
    <Title path={['Spells']} />

    <Collection
      accessor="spells"
      query={listSpells}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={spellColumns}
        />
      )}
    </Collection>
  </Box>
);

export default SpellList;
