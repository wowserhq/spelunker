import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import SpellReference from './Reference';

const listSpells = gql`
  query($offset: Int) {
    spells(offset: $offset) {
      totalCount
      results {
        ...SpellReference
      }
    }
  }

  ${SpellReference.fragment}
`;

const SpellList = () => (
  <Box>
    <Collection
      field="spells"
      query={listSpells}
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
            {results.map(spell => (
              <tr key={spell.id}>
                <td field="id">{spell.id}</td>
                <td>
                  <SpellReference spell={spell} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default SpellList;
