import React from 'react';
import gql from 'graphql-tag';

import {
  Box,
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
      map {
        ...MapReference
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

  ${AreaReference.fragment}
  ${MapReference.fragment}
`;

const Area = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchArea} variables={{ id }}>
      {({ data }) => {
        const { area } = data;
        const {
          name,
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


              <p>
                Soon™
              </p>
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
