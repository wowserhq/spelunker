import React from 'react';
import gql from 'graphql-tag';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import FactionReference from './Reference';
import ObjectiveOfTab from './tabs/ObjectiveOf';

const fetchFaction = gql`
  query($id: Int!) {
    faction(id: $id) {
      ...FactionReference
      description

      objectiveOf {
        totalCount
      }
    }
  }

  ${FactionReference.fragment}
`;

const Faction = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchFaction} variables={{ id }}>
      {({ data }) => {
        const { faction } = data;
        const {
          name,
          description,
          objectiveOf: { totalCount: objectiveOfCount },
        } = faction;
        return (
          <Title path={[name, 'Factions']}>
            <Box>
              <h1>
                <FactionReference faction={faction} />
              </h1>

              <p>
                {description}
              </p>
            </Box>

            <TabbedBox>
              {objectiveOfCount > 0 && <Tab
                label={`Objective of (${objectiveOfCount})`}
                component={ObjectiveOfTab}
                path="objective-of"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Faction;
