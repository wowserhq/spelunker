import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';

import RaceReference from './Reference';

const fetchRace = gql`
  query($id: Int!) {
    race(id: $id) {
      id
      name
      filename
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
              <h1>
                <RaceReference race={data.race} />
              </h1>
            </Box>
          </div>
        );
      }}
    </Query>
  );
};

export default Race;
