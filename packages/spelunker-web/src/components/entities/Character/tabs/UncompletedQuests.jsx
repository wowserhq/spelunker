import PropTypes from 'prop-types';
import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table from '../../../Table';
import questColumns from '../../Quest/columns';

const listUncompletedQuestsForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      uncompletedQuests(offset: $offset) {
        totalCount
        results {
          ...questColumns
        }
      }
    }
  }

  ${questColumns.fragment}
`;

const UncompletedQuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="character.uncompletedQuests"
      query={listUncompletedQuestsForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={questColumns}
        />
      )}
    </Collection>
  );
};

UncompletedQuestsTab.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default UncompletedQuestsTab;
