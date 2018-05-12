import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';

const fetchClass = gql`
  query($id: Int!) {
    class(id: $id) {
      id
      name
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
              <legend>{data.class.name}</legend>
            </Box>
          </div>
        );
      }}
    </Query>
  );
};

export default Class;
