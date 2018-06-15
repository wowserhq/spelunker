import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table, { Column, prefixAccessors } from '../../../Table';
import questColumns from '../../Quest/columns';

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

const CurrentQuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="character.currentQuests"
      query={listCurrentQuestsForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
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
