import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import SpellReference from './Reference';
import TaughtByTab from './tabs/TaughtBy';

const fetchSpell = gql`
  query($id: Int!) {
    spell(id: $id) {
      ...SpellReference

      taughtBy {
        totalCount
      }
    }
  }

  ${SpellReference.fragment}
`;

const Spell = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchSpell} variables={{ id }}>
      {({ data }) => {
        const { spell } = data;
        const {
          name,

          taughtBy: { totalCount: taughtByCount },
        } = spell;

        return (
          <Title path={[name, 'Spells']}>

            <Box>
              <h1>
                <SpellReference spell={spell} />
              </h1>
            </Box>

            <TabbedBox>
              {taughtByCount > 0 && <Tab
                label={`Taught by (${taughtByCount})`}
                component={TaughtByTab}
                path="taught-by"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Spell;
