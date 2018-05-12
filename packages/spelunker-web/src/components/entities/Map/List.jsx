import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import MapReference from './Reference';

const listMaps = gql`
  query($offset: Int) {
    maps(offset: $offset) {
      totalCount
      results {
        ...MapReference
      }
    }
  }

  ${MapReference.fragment}
`;

const MapList = () => (
  <Box>
    <Collection
      field="maps"
      query={listMaps}
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
            {results.map(map => (
              <tr key={map.id}>
                <td>{map.id}</td>
                <td>
                  <MapReference map={map} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default MapList;
