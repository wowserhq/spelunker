import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import EndsTab from './tabs/Ends';
import SpawnsTab from './tabs/Spawns';
import StartsTab from './tabs/Starts';

const fetchGameObject = gql`
  query($id: Int!) {
    object(id: $id) {
      id
      name
      spawns {
        totalCount
      }
      starts {
        totalCount
      }
      ends {
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
          spawns: { totalCount: spawnCount },
          starts: { totalCount: startCount },
          ends: { totalCount: endCount },
        } } = data;

        return (
          <div>
            <Box>
              <legend>{data.object.name}</legend>
            </Box>

            <TabbedBox>
              {spawnCount > 0 && <Tab
                label={`Spawns (${spawnCount})`}
                component={SpawnsTab}
                path="spawns"
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
          </div>
        );
      }}
    </Query>
  );
};

export default GameObject;
