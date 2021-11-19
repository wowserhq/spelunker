import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import ClassReference from './Reference';
import ExclusiveQuestsTab from './tabs/ExclusiveQuests';
import QuestsTab from './tabs/Quests';
import RacesTab from './tabs/Races';

const fetchClass = gql`
  query($id: Int!) {
    class(id: $id) {
      ...ClassReference
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

  ${ClassReference.fragment}
`;

const Class = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Query query={fetchClass} variables={{ id }}>
      {({ data }) => {
        const { class: klass } = data;
        const {
          name,
          description,

          exclusiveQuests: { totalCount: exclusiveQuestCount },
          quests: { totalCount: questCount },
          races: { totalCount: raceCount },
        } = klass;
        return (
          <Title path={[name, 'Classes']}>
            <Box>
              <h1>
                <ClassReference class={klass} />
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

export default Class;
