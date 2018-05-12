import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import GameObjectSpawnsTab from './tabs/GameObjectSpawns';
import NPCSpawnsTab from './tabs/NPCSpawns';

const fetchMap = gql`
  query($id: Int!) {
    map(id: $id) {
      id
      name
      npcSpawns {
        totalCount
      }
      objectSpawns {
        totalCount
      }
    }
  }
`;

const Map = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchMap} variables={{ id }}>
      {({ data }) => {
        const { map: {
          npcSpawns: { totalCount: npcSpawnCount },
          objectSpawns: { totalCount: objectSpawnCount },
        } } = data;

        return (
          <div>
            <Box>
              <legend>{data.map.name}</legend>
            </Box>

            <TabbedBox>
              {npcSpawnCount > 0 && <Tab
                label={`NPCs (${npcSpawnCount})`}
                component={NPCSpawnsTab}
                path="npcs"
                match={match}
              />}

              {objectSpawnCount > 0 && <Tab
                label={`Objects (${objectSpawnCount})`}
                component={GameObjectSpawnsTab}
                path="objects"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default Map;
