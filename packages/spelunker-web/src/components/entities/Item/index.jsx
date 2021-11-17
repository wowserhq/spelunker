import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import Currency from '../../formatters/Currency';
import ItemSetReference from '../ItemSet/Reference';
import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import ContainedInObjectTab from './tabs/ContainedInObject';
import ContainedInTab from './tabs/ContainedIn';
import ContainsTab from './tabs/Contains';
import DroppedByTab from './tabs/DroppedBy';
import ItemReference from './Reference';
import ObjectiveOfTab from './tabs/ObjectiveOf';
import ProvidedForTab from './tabs/ProvidedFor';
import RewardFromTab from './tabs/RewardFrom';
import SoldByTab from './tabs/SoldBy';
import StartsTab from './tabs/Starts';

const fetchItem = gql`
  query($id: Int!) {
    item(id: $id) {
      ...ItemReference
      buyPrice
      itemSet {
        ...ItemSetReference
      }
      sellPrice

      containedIn {
        totalCount
      }
      containedInObject {
        totalCount
      }
      contains {
        totalCount
      }
      droppedBy {
        totalCount
      }
      objectiveOf {
        totalCount
      }
      providedFor {
        totalCount
      }
      rewardFrom {
        totalCount
      }
      soldBy {
        totalCount
      }
      starts {
        totalCount
      }
    }
  }

  ${ItemReference.fragment}
  ${ItemSetReference.fragment}
`;

const Item = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Query query={fetchItem} variables={{ id }}>
      {({ data }) => {
        const { item } = data;
        const {
          buyPrice,
          itemSet,
          sellPrice,

          containedIn: { totalCount: containedInCount },
          containedInObject: { totalCount: containedInObjectCount },
          contains: { totalCount: containCount },
          droppedBy: { totalCount: droppedByCount },
          objectiveOf: { totalCount: objectiveOfCount },
          providedFor: { totalCount: providedForCount },
          rewardFrom: { totalCount: rewardFromCount },
          soldBy: { totalCount: soldByCount },
          starts: { totalCount: startCount },
        } = item;

        return (
          <Title path={[item.name, 'Items']}>
            <Box>
              <h1>
                <ItemReference item={item} />
              </h1>

              {itemSet && (
                <p>
                  Part of: <ItemSetReference itemSet={itemSet} />
                </p>
              )}

              {buyPrice > 0 && (
                <p>
                  Cost: <Currency value={buyPrice} />
                </p>
              )}

              {sellPrice > 0 && (
                <p>
                  Sells for: <Currency value={sellPrice} />
                </p>
              )}
            </Box>

            <TabbedBox>
              {droppedByCount > 0 && <Tab
                label={`Dropped by (${droppedByCount})`}
                component={DroppedByTab}
                path="dropped-by"
              />}

              {containedInCount > 0 && <Tab
                label={`Contained in (${containedInCount})`}
                component={ContainedInTab}
                path="contained-in"
              />}

              {containedInObjectCount > 0 && <Tab
                label={`Contained in object (${containedInObjectCount})`}
                component={ContainedInObjectTab}
                path="contained-in-object"
              />}

              {containCount > 0 && <Tab
                label={`Contains (${containCount})`}
                component={ContainsTab}
                path="contains"
              />}

              {objectiveOfCount > 0 && <Tab
                label={`Objective of (${objectiveOfCount})`}
                component={ObjectiveOfTab}
                path="objective-of"
              />}

              {providedForCount > 0 && <Tab
                label={`Provided for (${providedForCount})`}
                component={ProvidedForTab}
                path="provided-for"
              />}

              {rewardFromCount > 0 && <Tab
                label={`Reward from (${rewardFromCount})`}
                component={RewardFromTab}
                path="reward-from"
              />}

              {soldByCount > 0 && <Tab
                label={`Sold by (${soldByCount})`}
                component={SoldByTab}
                path="sold-by"
              />}

              {startCount > 0 && <Tab
                label={`Starts (${startCount})`}
                component={StartsTab}
                path="starts"
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Item;
