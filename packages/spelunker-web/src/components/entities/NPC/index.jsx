import React from 'react';
import gql from 'graphql-tag';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import DropsTab from './tabs/Drops';
import EndsTab from './tabs/Ends';
import NPCReference from './Reference';
import ObjectiveOfTab from './tabs/ObjectiveOf';
import SellsTab from './tabs/Sells';
import SpawnsTab from './tabs/Spawns';
import StartsTab from './tabs/Starts';
import TeachesTab from './tabs/Teaches';

const fetchNPC = gql`
  query($id: Int!) {
    npc(id: $id) {
      ...NPCReference

      drops {
        totalCount
      }
      ends {
        totalCount
      }
      objectiveOf {
        totalCount
      }
      sells {
        totalCount
      }
      spawns {
        totalCount
      }
      starts {
        totalCount
      }
      teaches {
        totalCount
      }
    }
  }

  ${NPCReference.fragment}
`;

const NPC = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchNPC} variables={{ id }}>
      {({ data }) => {
        const { npc } = data;
        const {
          name,

          drops: { totalCount: dropCount },
          ends: { totalCount: endCount },
          objectiveOf: { totalCount: objectiveOfCount },
          sells: { totalCount: sellCount },
          spawns: { totalCount: spawnCount },
          starts: { totalCount: startCount },
          teaches: { totalCount: teachCount },
        } = npc;

        return (
          <Title path={[name, 'NPCs']}>
            <Box>
              <h1>
                <NPCReference npc={npc} />
              </h1>
            </Box>

            <TabbedBox>
              {spawnCount > 0 && <Tab
                label={`Spawns (${spawnCount})`}
                component={SpawnsTab}
                path="spawns"
                match={match}
              />}

              {dropCount > 0 && <Tab
                label={`Drops (${dropCount})`}
                component={DropsTab}
                path="drops"
                match={match}
              />}

              {sellCount > 0 && <Tab
                label={`Sells (${sellCount})`}
                component={SellsTab}
                path="sells"
                match={match}
              />}

              {startCount > 0 && <Tab
                label={`Starts (${startCount})`}
                component={StartsTab}
                path="starts"
                match={match}
              />}

              {endCount > 0 && <Tab
                label={`Ends (${endCount})`}
                component={EndsTab}
                path="ends"
                match={match}
              />}

              {objectiveOfCount > 0 && <Tab
                label={`Objective of (${objectiveOfCount})`}
                component={ObjectiveOfTab}
                path="objective-of"
                match={match}
              />}

              {teachCount > 0 && <Tab
                label={`Teaches (${teachCount})`}
                component={TeachesTab}
                path="teaches"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default NPC;
