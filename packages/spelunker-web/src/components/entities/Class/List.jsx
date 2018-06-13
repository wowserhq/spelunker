import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Collection from '../../Collection';
import Table from '../../Table';
import Title from '../../Spelunker/Title';

import ClassReference from './Reference';
import classColumns from './columns';

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
    <Title path={['Classes']} />

    <Collection
      accessor="classes"
      query={listClasses}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={classColumns}
        />
      )}
    </Collection>
  </Box>
);

export default ClassList;
