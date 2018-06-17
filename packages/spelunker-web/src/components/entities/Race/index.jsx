import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import SideReference from '../Side/Reference';
import Title from '../../Spelunker/Title';

import RaceReference from './Reference';

const fetchRace = gql`
  query($id: Int!) {
    race(id: $id) {
      ...RaceReference
      description
      side {
        ...SideReference
      }
    }
  }

  ${RaceReference.fragment}
  ${SideReference.fragment}
`;

const Race = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchRace} variables={{ id }}>
      {({ data }) => {
        const { race } = data;
        const {
          name,
          description,
          side,
        } = race;
        return (
          <Title path={[name, 'Races']}>
            <Box>
              <h1>
                <RaceReference race={race} />
              </h1>

              {side && (
                <p>
                  Side: <SideReference side={side} />
                </p>
              )}

              <p>
                {description}
              </p>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Race;
