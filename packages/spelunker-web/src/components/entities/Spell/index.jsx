import React from 'react';
import gql from 'graphql-tag';

import { Box, Query, Tab, TabbedBox, Title } from '../../core';

import ProvidedForTab from './tabs/ProvidedFor';
import RewardFromTab from './tabs/RewardFrom';
import SpellReference from './Reference';
import TaughtByTab from './tabs/TaughtBy';

const fetchSpell = gql`
  query($id: Int!) {
    spell(id: $id) {
      ...SpellReference

      providedFor {
        totalCount
      }
      rewardFrom {
        totalCount
      }
      taughtBy {
        totalCount
      }
    }
  }

  ${SpellReference.fragment}
`;

const Spell = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Query query={fetchSpell} variables={{ id }}>
      {({ data }) => {
        const { spell } = data;
        const {
          name,

          providedFor: { totalCount: providedForCount },
          rewardFrom: { totalCount: rewardFromCount },
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
              {rewardFromCount > 0 && <Tab
                label={`Reward from (${rewardFromCount})`}
                component={RewardFromTab}
                path="reward-from"
                match={match}
              />}

              {taughtByCount > 0 && <Tab
                label={`Taught by (${taughtByCount})`}
                component={TaughtByTab}
                path="taught-by"
                match={match}
              />}

              {providedForCount > 0 && <Tab
                label={`Provided for (${providedForCount})`}
                component={ProvidedForTab}
                path="provided-for"
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
