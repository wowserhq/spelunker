import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';

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
          <div>
            <Box>
              <legend>
                <ClassReference class={data.class} />
              </legend>
            </Box>
          </div>
        );
      }}
    </Query>
  );
};

export default Class;
