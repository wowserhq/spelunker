import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

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
        const { race } = data;
        const { name } = race;
        return (
          <Title path={[name, 'Races']}>
            <Box>
              <h1>
                <RaceReference race={race} />
              </h1>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Race;
