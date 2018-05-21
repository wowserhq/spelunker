import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import CharacterReference from './Reference';
import CompletedQuestsTab from './tabs/CompletedQuests';
import CurrentQuestsTab from './tabs/CurrentQuests';
import InventoryTab from './tabs/Inventory';

const fetchCharacter = gql`
  query($id: Int!) {
    character(id: $id) {
      id
      name

      completedQuests {
        totalCount
      }
      currentQuests {
        totalCount
      }
      inventory {
        totalCount
      }
    }
  }

  ${CharacterReference.fragment}
`;

const Character = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchCharacter} variables={{ id }}>
      {({ data }) => {
        const { character } = data;
        const {
          name,

          completedQuests: { totalCount: completedQuestCount },
          currentQuests: { totalCount: currentQuestCount },
          inventory: { totalCount: inventoryCount },
        } = character;

        return (
          <Title path={[name, 'Characters']}>
            <Box>
              <h1>
                <CharacterReference character={character} />
              </h1>
            </Box>

            <TabbedBox>
              {inventoryCount > 0 && <Tab
                label={`Inventory (${inventoryCount})`}
                component={InventoryTab}
                path="inventory"
                match={match}
              />}

              {currentQuestCount > 0 && <Tab
                label={`Current quests (${currentQuestCount})`}
                component={CurrentQuestsTab}
                path="current-quests"
                match={match}
              />}

              {completedQuestCount > 0 && <Tab
                label={`Completed quests (${completedQuestCount})`}
                component={CompletedQuestsTab}
                path="completed-quests"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Character;
