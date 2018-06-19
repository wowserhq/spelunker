import React from 'react';
import gql from 'graphql-tag';

import SideReference from '../Side/Reference';
import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import ClassesTab from './tabs/Classes';
import ExclusiveQuestsTab from './tabs/ExclusiveQuests';
import QuestsTab from './tabs/Quests';
import RaceReference from './Reference';

const fetchRace = gql`
  query($id: Int!) {
    race(id: $id) {
      ...RaceReference
      description
      side {
        ...SideReference
      }

      classes {
        totalCount
      }
      exclusiveQuests: quests(exclusive: true) {
        totalCount
      }
      quests {
        totalCount
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

          classes: { totalCount: classCount },
          exclusiveQuests: { totalCount: exclusiveQuestCount },
          quests: { totalCount: questCount },
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

            <TabbedBox>
              {classCount > 0 && <Tab
                label={`Classes (${classCount})`}
                component={ClassesTab}
                path="classes"
                match={match}
              />}

              {exclusiveQuestCount > 0 && <Tab
                label={`Exclusive quests (${exclusiveQuestCount})`}
                component={ExclusiveQuestsTab}
                path="exclusive-quests"
                match={match}
              />}

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

export default Race;
