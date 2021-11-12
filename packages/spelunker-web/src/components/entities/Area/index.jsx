import React from 'react';
import gql from 'graphql-tag';

import {
  Bounds,
  Box,
  GameMap,
  List,
  ListItem,
  Query,
  Tab,
  TabbedBox,
  Title,
} from '../../core';

import MapReference from '../Map/Reference';

import AreaReference from './Reference';
import QuestsTab from './tabs/Quests';
import SubareasTab from './tabs/Subareas';

const fetchArea = gql`
  query($id: Int!) {
    area(id: $id) {
      ...AreaReference
      bounds {
        ...Bounds
      }
      map {
        ...MapReference
        filename
        bounds {
          ...Bounds
        }
      }
      parent {
        ...AreaReference
      }

      quests {
        totalCount
      }
      subareas {
        totalCount
      }
    }
  }

  ${Bounds.fragment}
  ${AreaReference.fragment}
  ${MapReference.fragment}
`;

const Area = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Query query={fetchArea} variables={{ id }}>
      {({ data }) => {
        const { area } = data;
        const {
          name,
          bounds,
          map,
          parent,

          quests: { totalCount: questCount },
          subareas: { totalCount: subareaCount },
        } = area;

        return (
          <Title path={[name, 'Areas']}>
            <Box>
              <h1>
                <AreaReference area={area} />
              </h1>

              <List>
                {parent && (
                  <ListItem>
                    Part of <AreaReference area={parent} />
                  </ListItem>
                )}
                <ListItem>
                  In <MapReference map={map} />
                </ListItem>
              </List>

              {bounds && (
                <div>
                  <h2>In-game map</h2>

                  <GameMap
                    bounds={bounds}
                    map={map}
                  />
                </div>
              )}
            </Box>

            <TabbedBox>
              {subareaCount > 0 && <Tab
                label={`Sub-areas (${subareaCount})`}
                component={SubareasTab}
                path="sub-areas"
                match={match}
              />}

              {questCount > 0 && <Tab
                label={`Quests (${questCount})`}
                component={QuestsTab}
                path="quests"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Area;
