import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import SpellReference from './Reference';
import TaughtByTab from './tabs/TaughtBy';

const fetchSpell = gql`
  query($id: Int!) {
    spell(id: $id) {
      id
      name
      taughtBy {
        totalCount
      }
    }
  }
`;

const Spell = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchSpell} variables={{ id }}>
      {({ data }) => {
        const { spell: {
          taughtBy: { totalCount: taughtByCount },
        } } = data;

        return (
          <div>
            <Box>
              <legend>
                <SpellReference spell={data.spell} />
              </legend>
            </Box>

            <TabbedBox>
              {taughtByCount > 0 && <Tab
                label={`Taught by (${taughtByCount})`}
                component={TaughtByTab}
                path="taught-by"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default Spell;
