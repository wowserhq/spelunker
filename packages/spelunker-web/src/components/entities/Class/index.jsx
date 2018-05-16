import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import ClassReference from './Reference';

const fetchClass = gql`
  query($id: Int!) {
    class(id: $id) {
      id
      name
      filename
    }
  }
`;

const Class = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchClass} variables={{ id }}>
      {({ data }) => {
        return (
          <Title path={[data.class.name, 'Classes']}>
            <Box>
              <h1>
                <ClassReference class={data.class} />
              </h1>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Class;
