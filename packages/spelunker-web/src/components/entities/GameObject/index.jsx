import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import ContainsTab from './tabs/Contains';
import EndsTab from './tabs/Ends';
import GameObjectReference from './Reference';
import SpawnsTab from './tabs/Spawns';
import StartsTab from './tabs/Starts';

const fetchGameObject = gql`
  query($id: Int!) {
    object(id: $id) {
      id
      name
      contains {
        totalCount
      }
      ends {
        totalCount
      }
      spawns {
        totalCount
      }
      starts {
        totalCount
      }
    }
  }
`;

const GameObject = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchGameObject} variables={{ id }}>
      {({ data }) => {
        const { object: {
          contains: { totalCount: containCount },
          ends: { totalCount: endCount },
          spawns: { totalCount: spawnCount },
          starts: { totalCount: startCount },
        } } = data;

        return (
          <Title path={[data.object.name, 'Objects']}>
            <Box>
              <h1>
                <GameObjectReference object={data.object} />
              </h1>
            </Box>

            <TabbedBox>
              {spawnCount > 0 && <Tab
                label={`Spawns (${spawnCount})`}
                component={SpawnsTab}
                path="spawns"
                match={match}
              />}

              {containCount > 0 && <Tab
                label={`Contains (${containCount})`}
                component={ContainsTab}
                path="contains"
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
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default GameObject;
