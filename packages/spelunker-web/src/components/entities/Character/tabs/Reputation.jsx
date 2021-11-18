import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import factionColumns from '../../Faction/columns';
import { Collection, Column, Table, prefixAccessors } from '../../../core';

const listReputationForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      reputation(offset: $offset) {
        totalCount
        results {
          standing
          faction {
            ...factionColumns
          }
        }
      }
    }
  }

  ${factionColumns.fragment}
`;

const ReputationTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="character.reputation"
      query={listReputationForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="faction.id"
          columns={[
            ...prefixAccessors(factionColumns, 'faction'),
            <Column id="standing" label="Standing" accessor="standing" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default ReputationTab;
