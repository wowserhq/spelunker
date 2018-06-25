import React from 'react';
import gql from 'graphql-tag';

import Currency from '../../formatters/Currency';
import FactionReference from '../Faction/Reference';
import GameObjectReference from '../GameObject/Reference';
import ItemReference from '../Item/Reference';
import NPCReference from '../NPC/Reference';
import SpellReference from '../Spell/Reference';
import { Box, List, ListItem, Query, Tab, TabbedBox, Title } from '../../core';

import EndedByTab from './tabs/EndedBy';
import EndedByObjectTab from './tabs/EndedByObject';
import QuestReference from './Reference';
import StartedByTab from './tabs/StartedBy';
import StartedByItemTab from './tabs/StartedByItem';
import StartedByObjectTab from './tabs/StartedByObject';

const fetchQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      ...QuestReference
      chain {
        totalCount
        results {
          ...QuestReference
        }
      }
      description
      providedItem {
        ...ItemReference
      }
      requiredFactions {
        totalCount
        results {
          value
          faction {
            ...FactionReference
          }
        }
      }
      requiredItems {
        totalCount
        results {
          count
          item {
            ...ItemReference
          }
        }
      }
      requiredMoney
      requiredNPCs {
        totalCount
        results {
          count
          npc {
            ...NPCReference
          }
        }
      }
      requiredObjects {
        totalCount
        results {
          count
          object {
            ...GameObjectReference
          }
        }
      }
      rewardChoiceItems {
        totalCount
        results {
          count
          item {
            ...ItemReference
          }
        }
      }
      rewardItems {
        totalCount
        results {
          count
          item {
            ...ItemReference
          }
        }
      }
      rewardMoney
      rewardSpell {
        ...SpellReference
      }

      endedBy {
        totalCount
      }
      endedByObject {
        totalCount
      }
      startedBy {
        totalCount
      }
      startedByItem {
        totalCount
      }
      startedByObject {
        totalCount
      }
    }
  }

  ${FactionReference.fragment}
  ${GameObjectReference.fragment}
  ${ItemReference.fragment}
  ${NPCReference.fragment}
  ${QuestReference.fragment}
  ${SpellReference.fragment}
`;

const Quest = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchQuest} variables={{ id }}>
      {({ data }) => {
        const { quest } = data;
        const {
          id,
          name,
          description,
          chain,
          providedItem,
          requiredFactions,
          requiredItems,
          requiredMoney,
          requiredNPCs,
          requiredObjects,
          rewardChoiceItems,
          rewardMoney,
          rewardItems,
          rewardSpell,

          endedBy: { totalCount: endedByCount },
          endedByObject: { totalCount: endedByObjectCount },
          startedBy: { totalCount: startedByCount },
          startedByItem: { totalCount: startedByItemCount },
          startedByObject: { totalCount: startedByObjectCount },
        } = quest;

        return (
          <Title path={[name, 'Quests']}>
            <Box>
              <h1>
                <QuestReference quest={quest} />
              </h1>

              {chain.totalCount > 0 && (
                <Box aside>
                  <h2>Quest Chain</h2>
                  <List>
                    {chain.results.map(quest => (
                      <ListItem key={quest.id} current={quest.id === id}>
                        <QuestReference quest={quest} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <p>
                {description}
              </p>

              {providedItem && (
                <div>
                  <h2>Provided item</h2>

                  <List>
                    <ListItem>
                      <ItemReference item={providedItem} />
                    </ListItem>
                  </List>
                </div>
              )}

              <h2>Requirements</h2>

              <List>
                {requiredMoney && (
                  <ListItem>
                    <Currency value={requiredMoney} />
                  </ListItem>
                )}

                {requiredFactions.results.map(({ value, faction }) => (
                  <ListItem>
                    <FactionReference faction={faction} /> ({value})
                  </ListItem>
                ))}

                {requiredItems.results.map(({ count, item }) => (
                  <ListItem>
                    <ItemReference item={item} /> {count}x
                  </ListItem>
                ))}

                {requiredNPCs.results.map(({ count, npc }) => (
                  <ListItem>
                    Slay <NPCReference npc={npc} /> {count}x
                  </ListItem>
                ))}

                {requiredObjects.results.map(({ count, object }) => (
                  <ListItem>
                    <GameObjectReference object={object} /> {count}x
                  </ListItem>
                ))}
              </List>

              <h2>Rewards</h2>

              <List>
                {rewardMoney && (
                  <ListItem>
                    <Currency value={rewardMoney} />
                  </ListItem>
                )}

                {rewardItems.results.map(({ count, item }) => (
                  <ListItem>
                    <ItemReference item={item} /> {count}x
                  </ListItem>
                ))}

                {rewardChoiceItems.totalCount > 0 && (
                  <ListItem>One of:
                    <List>
                      {rewardChoiceItems.results.map(({ count, item }) => (
                        <ListItem>
                          <ItemReference item={item} /> {count}x
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )}

                {rewardSpell && (
                  <ListItem>
                    <SpellReference spell={rewardSpell} />
                  </ListItem>
                )}
              </List>
            </Box>

            <TabbedBox>
              {startedByCount > 0 && <Tab
                label={`Started by (${startedByCount})`}
                component={StartedByTab}
                path="started-by"
                match={match}
              />}

              {startedByObjectCount > 0 && <Tab
                label={`Started by object (${startedByObjectCount})`}
                component={StartedByObjectTab}
                path="started-by-object"
                match={match}
              />}

              {startedByItemCount > 0 && <Tab
                label={`Started by item (${startedByItemCount})`}
                component={StartedByItemTab}
                path="started-by-item"
                match={match}
              />}

              {endedByCount > 0 && <Tab
                label={`Ended by (${endedByCount})`}
                component={EndedByTab}
                path="ended-by"
                match={match}
              />}

              {endedByObjectCount > 0 && <Tab
                label={`Ended by object (${endedByObjectCount})`}
                component={EndedByObjectTab}
                path="ended-by-object"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Quest;
