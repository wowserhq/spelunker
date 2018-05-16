import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import FactionReference from './Reference';

const listFactions = gql`
  query($offset: Int) {
    factions(offset: $offset) {
      totalCount
      results {
        ...FactionReference
      }
    }
  }

  ${FactionReference.fragment}
`;

const FactionList = () => (
  <Box>
    <Title path={['Factions']} />

    <Collection
      field="factions"
      query={listFactions}
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
            {results.map(faction => (
              <tr key={faction.id}>
                <td field="id">{faction.id}</td>
                <td>
                  <FactionReference faction={faction} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default FactionList;
