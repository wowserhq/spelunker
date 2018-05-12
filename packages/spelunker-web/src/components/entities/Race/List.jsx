import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import RaceReference from './Reference';

const listRaces = gql`
  query($offset: Int) {
    races(offset: $offset) {
      totalCount
      results {
        ...RaceReference
      }
    }
  }

  ${RaceReference.fragment}
`;

const RaceList = () => (
  <Box>
    <Collection
      field="races"
      query={listRaces}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map(race => (
              <tr key={race.id}>
                <td>{race.id}</td>
                <td>
                  <RaceReference race={race} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default RaceList;
