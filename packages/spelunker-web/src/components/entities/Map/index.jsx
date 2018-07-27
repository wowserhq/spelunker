import React from 'react';
import gql from 'graphql-tag';

import { Bounds, Box, GameMap, Query, Tab, TabbedBox, Title } from '../../core';

import AreasTab from './tabs/Areas';
import GameObjectSpawnsTab from './tabs/GameObjectSpawns';
import MapReference from './Reference';
import NPCSpawnsTab from './tabs/NPCSpawns';

const fetchMap = gql`
  query($id: Int!) {
    map(id: $id) {
      ...MapReference
      filename
      bounds {
        ...Bounds
      }

      areas {
        totalCount
      }
      npcSpawns {
        totalCount
      }
      objectSpawns {
        totalCount
      }
    }
  }

  ${Bounds.fragment}
  ${MapReference.fragment}
`;

const Map = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchMap} variables={{ id }}>
      {({ data }) => {
        const { map } = data;
        const {
          name,

          areas: { totalCount: areaCount },
          npcSpawns: { totalCount: npcSpawnCount },
          objectSpawns: { totalCount: objectSpawnCount },
        } = map;

        return (
          <Title path={[name, 'Maps']}>
            <Box>
              <h1>
                <MapReference map={map} />
              </h1>

              <h2>In-game map</h2>

              <GameMap
                map={map}
              />
            </Box>

            <TabbedBox>
              {areaCount > 0 && <Tab
                label={`Areas (${areaCount})`}
                component={AreasTab}
                path="areas"
                match={match}
              />}

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
