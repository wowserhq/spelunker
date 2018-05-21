import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import AreaReference from './Reference';

const listAreas = gql`
  query($offset: Int) {
    areas(offset: $offset) {
      totalCount
      results {
        ...AreaReference
      }
    }
  }

  ${AreaReference.fragment}
`;

const AreaList = () => (
  <Box>
    <Title path={['Areas']} />

    <Collection
      field="areas"
      query={listAreas}
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
            {results.map(area => (
              <tr key={area.id}>
                <td field="id">{area.id}</td>
                <td>
                  <AreaReference area={area} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default AreaList;
