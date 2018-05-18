import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import FactionReference from './Reference';
import ObjectiveOfTab from './tabs/ObjectiveOf';

const fetchFaction = gql`
  query($id: Int!) {
    faction(id: $id) {
      id
      name

      objectiveOf {
        totalCount
      }
    }
  }
`;

const Faction = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchFaction} variables={{ id }}>
      {({ data }) => {
        const { faction } = data;
        const {
          name,
          objectiveOf: { totalCount: objectiveOfCount },
        } = faction;
        return (
          <Title path={[name, 'Factions']}>
            <Box>
              <h1>
                <FactionReference faction={faction} />
              </h1>
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
