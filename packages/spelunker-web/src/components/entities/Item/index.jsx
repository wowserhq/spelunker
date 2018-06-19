import React from 'react';
import gql from 'graphql-tag';

import Currency from '../../formatters/Currency';
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
`;

const Item = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchItem} variables={{ id }}>
      {({ data }) => {
        const { item } = data;
        const {
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

              {item.buyPrice > 0 && (
                <p>
                  Cost: <Currency value={item.buyPrice} />
                </p>
              )}

              {item.sellPrice > 0 && (
                <p>
                  Sells for: <Currency value={item.sellPrice} />
                </p>
              )}
            </Box>

            <TabbedBox>
              {droppedByCount > 0 && <Tab
                label={`Dropped by (${droppedByCount})`}
                component={DroppedByTab}
                path="dropped-by"
                match={match}
              />}

              {containedInCount > 0 && <Tab
                label={`Contained in (${containedInCount})`}
                component={ContainedInTab}
                path="contained-in"
                match={match}
              />}

              {containedInObjectCount > 0 && <Tab
                label={`Contained in object (${containedInObjectCount})`}
                component={ContainedInObjectTab}
                path="contained-in-object"
                match={match}
              />}

              {containCount > 0 && <Tab
                label={`Contains (${containCount})`}
                component={ContainsTab}
                path="contains"
                match={match}
              />}

              {objectiveOfCount > 0 && <Tab
                label={`Objective of (${objectiveOfCount})`}
                component={ObjectiveOfTab}
                path="objective-of"
                match={match}
              />}

              {providedForCount > 0 && <Tab
                label={`Provided for (${providedForCount})`}
                component={ProvidedForTab}
                path="provided-for"
                match={match}
              />}

              {rewardFromCount > 0 && <Tab
                label={`Reward from (${rewardFromCount})`}
                component={RewardFromTab}
                path="reward-from"
                match={match}
              />}

              {soldByCount > 0 && <Tab
                label={`Sold by (${soldByCount})`}
                component={SoldByTab}
                path="sold-by"
                match={match}
              />}

              {startCount > 0 && <Tab
                label={`Starts (${startCount})`}
                component={StartsTab}
                path="starts"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Item;
