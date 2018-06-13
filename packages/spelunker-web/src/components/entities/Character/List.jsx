import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import ClassReference from '../Class/Reference';
import Collection from '../../Collection';
import RaceReference from '../Race/Reference';
import Table from '../../Table';
import Title from '../../Spelunker/Title';
import characterColumns from '../Character/columns';

import CharacterReference from './Reference';

const listCharacters = gql`
  query($offset: Int) {
    characters(offset: $offset) {
      totalCount
      results {
        ...CharacterReference
        race {
          ...RaceReference
        }
        class {
          ...ClassReference
        }
        gender
        level
        xp
      }
    }
  }

  ${CharacterReference.fragment}
  ${ClassReference.fragment}
  ${RaceReference.fragment}
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
