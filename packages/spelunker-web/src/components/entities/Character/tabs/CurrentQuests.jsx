import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

import questColumns from '../../Quest/columns';
import { Collection, Column, Table, prefixAccessors } from '../../../core';

const listCurrentQuestsForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      currentQuests(offset: $offset) {
        totalCount
        results {
          status
          quest {
            ...questColumns
          }
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const CurrentQuestsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Collection
      accessor="character.currentQuests"
      query={listCurrentQuestsForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="quest.id"
          columns={[
            ...prefixAccessors(questColumns, 'quest'),
            <Column id="status" label="Status" accessor="status" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default CurrentQuestsTab;
