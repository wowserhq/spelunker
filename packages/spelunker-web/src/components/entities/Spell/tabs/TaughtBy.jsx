import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import NPCReference from '../../NPC/Reference';
import Table, { CurrencyColumn, prefixAccessors } from '../../../Table';
import npcColumns from '../../NPC/columns';

const listTaughtByForSpell = gql`
  query($id: Int!, $offset: Int) {
    spell(id: $id) {
      id
      taughtBy(offset: $offset) {
        totalCount
        results {
          cost
          npc {
            ...NPCReference
          }
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const TaughtByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="spell.taughtBy"
      query={listTaughtByForSpell}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            ...prefixAccessors(npcColumns, 'npc'),
            <CurrencyColumn label="Cost" accessor="cost" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default TaughtByTab;
