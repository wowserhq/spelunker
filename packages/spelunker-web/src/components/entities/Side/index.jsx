import React from 'react';
import gql from 'graphql-tag';

import Box, { TabbedBox, Tab } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import ExclusiveQuestsTab from './tabs/ExclusiveQuests';
import QuestsTab from './tabs/Quests';
import RacesTab from './tabs/Races';
import SideReference from './Reference';

const fetchSide = gql`
  query($id: String!) {
    side(id: $id) {
      ...SideReference
      description

      exclusiveQuests: quests(exclusive: true) {
        totalCount
      }
      quests {
        totalCount
      }
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
          exclusiveQuests: { totalCount: exclusiveQuestCount },
          quests: { totalCount: questCount },
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

              {questCount > 0 && <Tab
                label={`Quests (${questCount})`}
                component={QuestsTab}
                path="quests"
                match={match}
              />}

              {exclusiveQuestCount > 0 && <Tab
                label={`Exclusive quests (${exclusiveQuestCount})`}
                component={ExclusiveQuestsTab}
                path="exclusive-quests"
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
