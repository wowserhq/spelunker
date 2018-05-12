import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import DropsTab from './tabs/Drops';
import EndsTab from './tabs/Ends';
import SellsTab from './tabs/Sells';
import SpawnsTab from './tabs/Spawns';
import StartsTab from './tabs/Starts';

const fetchNPC = gql`
  query($id: Int!) {
    npc(id: $id) {
      id
      name
      spawns {
        totalCount
      }
      drops {
        totalCount
      }
      starts {
        totalCount
      }
      ends {
        totalCount
      }
      sells {
        totalCount
      }
    }
  }
`;

const NPC = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchNPC} variables={{ id }}>
      {({ data }) => {
        const { npc: {
          spawns: { totalCount: spawnCount },
          drops: { totalCount: dropCount },
          starts: { totalCount: startCount },
          ends: { totalCount: endCount },
          sells: { totalCount: sellCount },
        } } = data;

        return (
          <div>
            <Box>
              <legend>{data.npc.name}</legend>
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

              {sellCount > 0 && <Tab
                label={`Sells (${sellCount})`}
                component={SellsTab}
                path="sells"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default NPC;
