import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';

const fetchRace = gql`
  query($id: Int!) {
    race(id: $id) {
      id
      name
    }
  }
`;

const Race = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchRace} variables={{ id }}>
      {({ data }) => {
        return (
          <div>
            <Box>
              <legend>{data.race.name}</legend>
            </Box>
          </div>
        );
      }}
    </Query>
  );
};

export default Race;
