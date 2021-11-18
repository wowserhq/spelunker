import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import LocationSelector from '../Location/Selector';
import {
  Bounds,
  Box,
  List,
  ListItem,
  Query,
  Tab,
  TabbedBox,
  Title,
} from '../../core';
import { humanize } from '../../../utils/inflector';

import ContainsTab from './tabs/Contains';
import EndsTab from './tabs/Ends';
import GameObjectReference from './Reference';
import ObjectiveOfTab from './tabs/ObjectiveOf';
import StartsTab from './tabs/Starts';

const fetchGameObject = gql`
  query($id: Int!) {
    object(id: $id) {
      ...GameObjectReference
      type

      locations {
        results {
          areas {
            results {
              area {
                id
                name
                bounds {
                  ...Bounds
                }
              }
              spawnCount
            }
          }

          map {
            id
            name
            filename
            bounds {
              ...Bounds
            }
          }

          spawns {
            totalCount
            results {
              id
              x
              y
            }
          }
        }
      }

      contains {
        totalCount
      }
      ends {
        totalCount
      }
      objectiveOf {
        totalCount
      }
      starts {
        totalCount
      }
    }
  }

  ${Bounds.fragment}
  ${GameObjectReference.fragment}
`;

const GameObject = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Query query={fetchGameObject} variables={{ id }}>
      {({ data }) => {
        const { object } = data;
        const {
          name,
          locations,
          type,

          contains: { totalCount: containCount },
          ends: { totalCount: endCount },
          objectiveOf: { totalCount : objectiveOfCount },
          starts: { totalCount: startCount },
        } = object;

        return (
          <Title path={[name, 'Objects']}>
            <Box>
              <h1>
                <GameObjectReference object={object} />
              </h1>

              <List>
                <ListItem>Type: {humanize(type)}</ListItem>
              </List>

              <h2>Location</h2>

              <LocationSelector
                entity="game object"
                locations={locations.results}
              />
            </Box>

            <TabbedBox>
              {containCount > 0 && <Tab
                label={`Contains (${containCount})`}
                component={ContainsTab}
                path="contains"
              />}

              {startCount > 0 && <Tab
                label={`Starts (${startCount})`}
                component={StartsTab}
                path="starts"
              />}

              {endCount > 0 && <Tab
                label={`Ends (${endCount})`}
                component={EndsTab}
                path="ends"
              />}

              {objectiveOfCount > 0 && <Tab
                label={`Objective of (${objectiveOfCount})`}
                component={ObjectiveOfTab}
                path="objective-of"
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default GameObject;
