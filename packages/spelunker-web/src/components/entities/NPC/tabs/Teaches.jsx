import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import spellColumns from '../../Spell/columns';
import {
  Collection,
  CurrencyColumn,
  Table,
  prefixAccessors,
} from '../../../core';

const listTeachesForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      teaches(offset: $offset) {
        totalCount
        results {
          cost
          spell {
            ...spellColumns
          }
        }
      }
    }
  }

  ${spellColumns.fragment}
`;

const TeachesTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="npc.teaches"
      query={listTeachesForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="spell.id"
          columns={[
            ...prefixAccessors(spellColumns, 'spell'),
            <CurrencyColumn label="Cost" accessor="cost" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default TeachesTab;
