import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import AreasTab from './tabs/Areas';
import ExclusiveQuestsTab from './tabs/ExclusiveQuests';
import QuestsTab from './tabs/Quests';
import RacesTab from './tabs/Races';
import SideReference from './Reference';

const fetchSide = gql`
  query($id: String!) {
    side(id: $id) {
      ...SideReference
      description

      areas {
        totalCount
      }
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

const Side = () => {
  const params = useParams();
  const { id } = params;
  return (
    <Query query={fetchSide} variables={{ id }}>
      {({ data }) => {
        const { side } = data;
        const {
          name,
          description,

          areas: { totalCount: areaCount },
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
              />}

              {areaCount > 0 && <Tab
                label={`Areas (${areaCount})`}
                component={AreasTab}
                path="areas"
              />}

              {exclusiveQuestCount > 0 && <Tab
                label={`Exclusive quests (${exclusiveQuestCount})`}
                component={ExclusiveQuestsTab}
                path="exclusive-quests"
              />}

              {questCount > 0 && <Tab
                label={`Quests (${questCount})`}
                component={QuestsTab}
                path="quests"
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Side;
