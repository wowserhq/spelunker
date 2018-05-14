import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import CharacterReference from './Reference';

const listCharacters = gql`
  query($offset: Int) {
    characters(offset: $offset) {
      totalCount
      results {
        ...CharacterReference
      }
    }
  }

  ${CharacterReference.fragment}
`;

const CharacterList = () => (
  <Box>
    <Collection
      field="characters"
      query={listCharacters}
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
            {results.map(character => (
              <tr key={character.id}>
                <td field="id">{character.id}</td>
                <td>
                  <CharacterReference character={character} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default CharacterList;
