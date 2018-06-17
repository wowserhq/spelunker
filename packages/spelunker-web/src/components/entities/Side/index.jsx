import React from 'react';
import gql from 'graphql-tag';

import Box, { TabbedBox, Tab } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import RacesTab from './tabs/Races';
import SideReference from './Reference';

const fetchSide = gql`
  query($id: String!) {
    side(id: $id) {
      ...SideReference
      description

      races {
        totalCount
      }
    }
  }

  ${SideReference.fragment}
`;

const Side = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchSide} variables={{ id }}>
      {({ data }) => {
        const { side } = data;
        const {
          name,
          description,
          races: { totalCount: raceCount },
        } = side;

        return (
          <Title path={[name, 'Sides']}>
            <Box>
              <h1>
                <SideReference side={side} />
              </h1>

              <p>
                {description}
              </p>
            </Box>

            <TabbedBox>
              {raceCount > 0 && <Tab
                label={`Races (${raceCount})`}
                component={RacesTab}
                path="races"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Side;
