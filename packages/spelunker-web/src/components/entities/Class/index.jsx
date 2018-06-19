import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

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

const Class = ({ match }) => {
  const { id } = match.params;
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

export default Class;
