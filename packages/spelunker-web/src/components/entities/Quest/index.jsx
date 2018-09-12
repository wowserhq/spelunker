import React from 'react';
import gql from 'graphql-tag';

import ClassReference from '../Class/Reference';
import Currency from '../../formatters/Currency';
import FactionReference from '../Faction/Reference';
import GameObjectReference from '../GameObject/Reference';
import ItemReference from '../Item/Reference';
import NPCReference from '../NPC/Reference';
import RaceReference from '../Race/Reference';
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
      classes {
        totalCount
        results {
          ...ClassReference
        }
      }
      description
      level,
      mutuallyExclusiveWith {
        totalCount
        results {
          ...QuestReference
        }
      }
      nextQuests {
        totalCount
        results {
          ...QuestReference
        }
      }
      objectiveTexts
      prerequisiteChoiceQuests {
        totalCount
        results {
          ...QuestReference
        }
      }
      prerequisiteFactionReputation {
        totalCount
        results {
          value
          faction {
            ...FactionReference
          }
        }
      }
      prerequisiteLevel
      prerequisiteMaxLevel
      prerequisiteQuests {
        totalCount
        results {
          ...QuestReference
        }
      }
      providedItem {
        ...ItemReference
      }
      providedSpell {
        ...SpellReference
      }
      races(exclusive: true) {
        totalCount
        results {
          ...RaceReference
        }
      }
      requiredFactionReputation {
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
      rewardFactionReputation {
        totalCount
        results {
          value
          faction {
            ...FactionReference
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

  ${ClassReference.fragment}
  ${FactionReference.fragment}
  ${GameObjectReference.fragment}
  ${ItemReference.fragment}
  ${NPCReference.fragment}
  ${QuestReference.fragment}
  ${RaceReference.fragment}
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
          classes,
          level,
          mutuallyExclusiveWith,
          nextQuests,
          objectiveTexts,
          prerequisiteChoiceQuests,
          prerequisiteFactionReputation,
          prerequisiteLevel,
          prerequisiteMaxLevel,
          prerequisiteQuests,
          providedItem,
          providedSpell,
          races,
          requiredFactionReputation,
          requiredItems,
          requiredMoney,
          requiredNPCs,
          requiredObjects,
          rewardChoiceItems,
          rewardFactionReputation,
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

              <List>
                {level > 0 && (
                  <ListItem>
                    Quest level: {level}
                  </ListItem>
                )}

                {providedItem && (
                  <ListItem>
                    Provided item: <ItemReference item={providedItem} />
                  </ListItem>
                )}

                {providedSpell && (
                  <ListItem>
                    Spell cast on start: <SpellReference spell={providedSpell} />
                  </ListItem>
                )}
              </List>

              <List label="Prerequisites">
                {prerequisiteLevel > 0 && (
                  <ListItem>
                    Minimum level: {prerequisiteLevel}
                  </ListItem>
                )}

                {prerequisiteMaxLevel > 0 && (
                  <ListItem>
                    Maximum level: {prerequisiteMaxLevel}
                  </ListItem>
                )}

                {classes.totalCount > 0 && (
                  <ListItem>
                    Classes: {classes.results.map(klass => (
                      <ClassReference
                        class={klass}
                        iconSize="small"
                        key={klass.id}
                        withoutName
                      />
                    ))}
                  </ListItem>
                )}

                {races.totalCount > 0 && (
                  <ListItem>
                    Races: {races.results.map(race => (
                      <RaceReference
                        iconSize="small"
                        key={race.id}
                        race={race}
                        withoutName
                      />
                    ))}
                  </ListItem>
                )}

                {prerequisiteFactionReputation.results.map(({ value, faction }) => (
                  <ListItem key={faction.id}>
                    <FactionReference faction={faction} /> ({value})
                  </ListItem>
                ))}

                {prerequisiteChoiceQuests.totalCount > 0 && (
                  <ListItem>Complete <strong>one</strong> of:
                    <List>
                      {prerequisiteChoiceQuests.results.map(quest => (
                        <ListItem key={quest.id}>
                          <QuestReference quest={quest} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )}

                {prerequisiteQuests.totalCount > 0 && (
                  <ListItem>Complete:
                    <List>
                      {prerequisiteQuests.results.map(quest => (
                        <ListItem key={quest.id}>
                          <QuestReference quest={quest} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )}

                {mutuallyExclusiveWith.totalCount > 0 && (
                  <ListItem>Must <strong>not</strong> have accepted:
                    <List>
                      {mutuallyExclusiveWith.results.map(quest => (
                        <ListItem key={quest.id}>
                          <QuestReference quest={quest} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )}
              </List>

              <List label="Objectives">
                {requiredMoney && (
                  <ListItem>
                    <Currency value={requiredMoney} />
                  </ListItem>
                )}

                {requiredFactionReputation.results.map(({ value, faction }) => (
                  <ListItem key={faction.id}>
                    <FactionReference faction={faction} /> ({value})
                  </ListItem>
                ))}

                {requiredItems.results.map(({ count, item }) => (
                  <ListItem key={item.id}>
                    <ItemReference item={item} /> {count}x
                  </ListItem>
                ))}

                {requiredNPCs.results.map(({ count, npc }, i) => (
                  <ListItem key={npc.id}>
                    {objectiveTexts[i] || 'Slay'} <NPCReference npc={npc} withoutSubname /> {count}x
                  </ListItem>
                ))}

                {requiredObjects.results.map(({ count, object }) => (
                  <ListItem key={object.id}>
                    <GameObjectReference object={object} /> {count}x
                  </ListItem>
                ))}
              </List>

              <List label="Rewards">
                {/* rewardXP */}

                {rewardMoney && (
                  <ListItem>
                    <Currency value={rewardMoney} />
                  </ListItem>
                )}

                {rewardItems.results.map(({ count, item }) => (
                  <ListItem key={item.id}>
                    <ItemReference item={item} /> {count}x
                  </ListItem>
                ))}

                {rewardChoiceItems.totalCount > 0 && (
                  <ListItem>One of:
                    <List>
                      {rewardChoiceItems.results.map(({ count, item }) => (
                        <ListItem key={item.id}>
                          <ItemReference item={item} /> {count}x
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                )}

                {rewardFactionReputation.results.map(({ value, faction }) => (
                  <ListItem key={faction.id}>
                    <FactionReference faction={faction} /> ({value})
                  </ListItem>
                ))}

                {rewardSpell && (
                  <ListItem>
                    <SpellReference spell={rewardSpell} />
                  </ListItem>
                )}

                {nextQuests.totalCount > 0 && (
                  <ListItem>Unlocks:
                    <List>
                      {nextQuests.results.map(quest => (
                        <ListItem key={quest.id}>
                          <QuestReference quest={quest} />
                        </ListItem>
                      ))}
                    </List>
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
