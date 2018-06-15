import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import ClassReference from './Reference';

const fetchClass = gql`
  query($id: Int!) {
    class(id: $id) {
      ...ClassReference
    }
  }

  ${ClassReference.fragment}
`;

const Class = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchClass} variables={{ id }}>
      {({ data }) => {
        const { class: klass } = data;
        const { name } = klass;
        return (
          <Title path={[name, 'Classes']}>
            <Box>
              <h1>
                <ClassReference class={klass} />
              </h1>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Class;
