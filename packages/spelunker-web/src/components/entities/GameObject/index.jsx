import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';

const fetchGameObject = gql`
  query($id: Int!) {
    object(id: $id) {
      id
      name
    }
  }
`;

const GameObject = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchGameObject} variables={{ id }}>
      {({ data }) => {
        return (
          <div>
            <Box>
              <legend>{data.object.name}</legend>
            </Box>
          </div>
        );
      }}
    </Query>
  );
};

export default GameObject;
