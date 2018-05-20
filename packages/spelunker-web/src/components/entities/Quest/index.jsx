import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Currency from '../../formatters/Currency';
import FactionReference from '../Faction/Reference';
import GameObjectReference from '../GameObject/Reference';
import ItemReference from '../Item/Reference';
import NPCReference from '../NPC/Reference';
import Query from '../../Query';
import SpellReference from '../Spell/Reference';
import Title from '../../Spelunker/Title';

import EndedByTab from './tabs/EndedBy';
import EndedByObjectTab from './tabs/EndedByObject';
import QuestReference from './Reference';
import StartedByTab from './tabs/StartedBy';
import StartedByItemTab from './tabs/StartedByItem';
import StartedByObjectTab from './tabs/StartedByObject';

const fetchQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      name
      description
      requiredMoney
      rewardMoney

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
  ${SpellReference.fragment}
`;

const Quest = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchQuest} variables={{ id }}>
      {({ data }) => {
        const { quest } = data;
        const {
          name,
          description,
          requiredMoney,
          rewardMoney,

          providedItem,
          requiredFactions,
          requiredItems,
          requiredNPCs,
          requiredObjects,
          rewardChoiceItems,
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

              <p>
                {description}
              </p>

              {providedItem && (
                <div>
                  <h2>Provided item</h2>

                  <ul>
                    <li>
                      <ItemReference item={providedItem} />
                    </li>
                  </ul>
                </div>
              )}

              <h2>Requirements</h2>

              <ul>
                {requiredMoney && (
                  <li>
                    <Currency value={requiredMoney} />
                  </li>
                )}

                {requiredFactions.results.map(({ value, faction }) => (
                  <li>
                    <FactionReference faction={faction} /> ({value})
                  </li>
                ))}

                {requiredItems.results.map(({ count, item }) => (
                  <li>
                    <ItemReference item={item} /> {count}x
                  </li>
                ))}

                {requiredNPCs.results.map(({ count, npc }) => (
                  <li>
                    Slay <NPCReference npc={npc} /> {count}x
                  </li>
                ))}

                {requiredObjects.results.map(({ count, object }) => (
                  <li>
                    <GameObjectReference object={object} /> {count}x
                  </li>
                ))}
              </ul>

              <h2>Rewards</h2>

              <ul>
                {rewardMoney && (
                  <li>
                    <Currency value={rewardMoney} />
                  </li>
                )}

                {rewardItems.results.map(({ count, item }) => (
                  <li>
                    <ItemReference item={item} /> {count}x
                  </li>
                ))}

                {rewardChoiceItems.totalCount > 0 && (
                  <li>One of:
                    <ul>
                      {rewardChoiceItems.results.map(({ count, item }) => (
                        <li>
                          <ItemReference item={item} /> {count}x
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                {rewardSpell && (
                  <li>
                    <SpellReference spell={rewardSpell} />
                  </li>
                )}
              </ul>
            </Box>

            <TabbedBox>
              {startedByCount > 0 && <Tab
                label={`Started by (${startedByCount})`}
                component={StartedByTab}
                path="started-by"
                match={match}
              />}

              {endedByCount > 0 && <Tab
                label={`Ended by (${endedByCount})`}
                component={EndedByTab}
                path="ended-by"
                match={match}
              />}

              {startedByObjectCount > 0 && <Tab
                label={`Started by object (${startedByObjectCount})`}
                component={StartedByObjectTab}
                path="started-by-object"
                match={match}
              />}

              {endedByObjectCount > 0 && <Tab
                label={`Ended by object (${endedByObjectCount})`}
                component={EndedByObjectTab}
                path="ended-by-object"
                match={match}
              />}

              {startedByItemCount > 0 && <Tab
                label={`Started by item (${startedByItemCount})`}
                component={StartedByItemTab}
                path="started-by-item"
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
