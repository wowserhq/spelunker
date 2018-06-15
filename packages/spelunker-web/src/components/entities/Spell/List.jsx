import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

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
