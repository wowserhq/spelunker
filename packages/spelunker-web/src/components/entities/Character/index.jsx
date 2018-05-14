import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import CharacterReference from './Reference';
import InventoryTab from './tabs/Inventory';

const fetchCharacter = gql`
  query($id: Int!) {
    character(id: $id) {
      id
      name
      inventory {
        totalCount
      }
    }
  }
`;

const Character = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchCharacter} variables={{ id }}>
      {({ data }) => {
        const { character: {
          inventory: { totalCount: inventoryCount },
        } } = data;

        return (
          <div>
            <Box>
              <h1>
                <CharacterReference character={data.character} />
              </h1>
            </Box>

            <TabbedBox>
              {inventoryCount > 0 && <Tab
                label={`Inventory (${inventoryCount})`}
                component={InventoryTab}
                path="inventory"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default Character;
