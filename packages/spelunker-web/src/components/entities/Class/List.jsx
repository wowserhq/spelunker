import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';

import ClassReference from './Reference';

const listClasses = gql`
  query($offset: Int) {
    classes(offset: $offset) {
      totalCount
      results {
        ...ClassReference
      }
    }
  }

  ${ClassReference.fragment}
`;

const ClassList = () => (
  <Box>
    <Collection
      field="classes"
      query={listClasses}
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
            {results.map(klass => (
              <tr key={klass.id}>
                <td field="id">{klass.id}</td>
                <td>
                  <ClassReference class={klass} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  </Box>
);

export default ClassList;
