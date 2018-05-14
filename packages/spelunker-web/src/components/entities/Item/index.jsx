import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Currency from '../../formatters/Currency';
import Query from '../../Query';

import ContainedInObjectTab from './tabs/ContainedInObject';
import ContainedInTab from './tabs/ContainedIn';
import ContainsTab from './tabs/Contains';
import DroppedByTab from './tabs/DroppedBy';
import ItemReference from './Reference';
import SoldByTab from './tabs/SoldBy';
import StartsTab from './tabs/Starts';

const fetchItem = gql`
  query($id: Int!) {
    item(id: $id) {
      id
      name
      buyPrice
      sellPrice
      quality
      displayInfo {
        icon
      }
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
      soldBy {
        totalCount
      }
      starts {
        totalCount
      }
    }
  }
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
          soldBy: { totalCount: soldByCount },
          starts: { totalCount: startCount },
        } = item;

        return (
          <div>
            <Box>
              <h1>
                <ItemReference item={item} link={false} />
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
          </div>
        );
      }}
    </Query>
  );
};

export default Item;
