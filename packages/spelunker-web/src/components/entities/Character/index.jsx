import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import AccountReference from '../Account/Reference';
import LocationSelector from '../Location/Selector';
import {
  Bounds,
  Box,
  List,
  ListItem,
  Query,
  Tab,
  TabbedBox,
  Title,
} from '../../core';

import CharacterReference from './Reference';
import CompletedQuestsTab from './tabs/CompletedQuests';
import CurrentQuestsTab from './tabs/CurrentQuests';
import InventoryTab from './tabs/Inventory';
import ReputationTab from './tabs/Reputation';
import UncompletedQuestsTab from './tabs/UncompletedQuests';

const fetchCharacter = gql`
  query($id: Int!) {
    character(id: $id) {
      ...CharacterReference
      account {
        ...AccountReference
      }

      location {
        areas {
          results {
            area {
              id
              name
              bounds {
                ...Bounds
              }
            }
            spawnCount
          }
        }

        map {
          id
          name
          filename
          bounds {
            ...Bounds
          }
        }

        spawns {
          totalCount
          results {
            x
            y
          }
        }
      }

      completedQuests {
        totalCount
      }
      currentQuests {
        totalCount
      }
      inventory {
        totalCount
      }
      reputation {
        totalCount
      }
      uncompletedQuests {
        totalCount
      }
    }
  }

  ${AccountReference.fragment}
  ${Bounds.fragment}
  ${CharacterReference.fragment}
`;

const Character = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Query query={fetchCharacter} variables={{ id }}>
      {({ data }) => {
        const { character } = data;
        const {
          name,
          account,
          location,

          completedQuests: { totalCount: completedQuestCount },
          currentQuests: { totalCount: currentQuestCount },
          inventory: { totalCount: inventoryCount },
          reputation: { totalCount : reputationCount },
          uncompletedQuests: { totalCount: uncompletedQuestCount },
        } = character;

        return (
          <Title path={[name, 'Characters']}>
            <Box>
              <h1>
                <CharacterReference character={character} />
              </h1>

              <List>
                <ListItem>
                  Account: <AccountReference account={account} />
                </ListItem>
              </List>

              <h2>Location</h2>

              <LocationSelector
                entity="character"
                locations={[location]}
              />
            </Box>

            <TabbedBox>
              {inventoryCount > 0 && <Tab
                label={`Inventory (${inventoryCount})`}
                component={InventoryTab}
                path="inventory"
              />}

              {currentQuestCount > 0 && <Tab
                label={`Current quests (${currentQuestCount})`}
                component={CurrentQuestsTab}
                path="current-quests"
              />}

              {completedQuestCount > 0 && <Tab
                label={`Completed quests (${completedQuestCount})`}
                component={CompletedQuestsTab}
                path="completed-quests"
              />}

              {uncompletedQuestCount > 0 && <Tab
                label={`Uncompleted quests (${uncompletedQuestCount})`}
                component={UncompletedQuestsTab}
                path="uncompleted-quests"
              />}

              {reputationCount > 0 && <Tab
                label={`Reputation (${reputationCount})`}
                component={ReputationTab}
                path="reputation"
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Character;
