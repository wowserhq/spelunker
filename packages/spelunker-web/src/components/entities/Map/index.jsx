import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import GameObjectSpawnsTab from './tabs/GameObjectSpawns';
import MapReference from './Reference';
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
        const { map } = data;
        const {
          name,

          npcSpawns: { totalCount: npcSpawnCount },
          objectSpawns: { totalCount: objectSpawnCount },
        } = map;

        return (
          <Title path={[name, 'Maps']}>
            <Box>
              <h1>
                <MapReference map={map} />
              </h1>
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
          </Title>
        );
      }}
    </Query>
  );
};

export default Map;
