import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import npcColumns from '../../NPC/columns';
import {
  Collection,
  CurrencyColumn,
  Table,
  prefixAccessors,
} from '../../../core';

const listTaughtByForSpell = gql`
  query($id: Int!, $offset: Int) {
    spell(id: $id) {
      id
      taughtBy(offset: $offset) {
        totalCount
        results {
          cost
          npc {
            ...npcColumns
          }
        }
      }
    }
  }

  ${npcColumns.fragment}
`;

const TaughtByTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="spell.taughtBy"
      query={listTaughtByForSpell}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="npc.id"
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
