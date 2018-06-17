import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table, { CurrencyColumn, prefixAccessors } from '../../../Table';
import spellColumns from '../../Spell/columns';

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

const TeachesTab = ({ match }) => {
  const { id } = match.params;
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
