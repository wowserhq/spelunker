import React from 'react';
import gql from 'graphql-tag';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import AreaReference from './Reference';
import QuestsTab from './tabs/Quests';

const fetchArea = gql`
  query($id: Int!) {
    area(id: $id) {
      ...AreaReference

      quests {
        totalCount
      }
    }
  }

  ${AreaReference.fragment}
`;

const Area = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchArea} variables={{ id }}>
      {({ data }) => {
        const { area } = data;
        const {
          name,

          quests: { totalCount: questCount },
        } = area;

        return (
          <Title path={[name, 'Areas']}>
            <Box>
              <h1>
                <AreaReference area={area} />
              </h1>

              <h2>In-game map</h2>

              <p>
                Soon™
              </p>
            </Box>

            <TabbedBox>
              {questCount > 0 && <Tab
                label={`Quests (${questCount})`}
                component={QuestsTab}
                path="quests"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Area;
