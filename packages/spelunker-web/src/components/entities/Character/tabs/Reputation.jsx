import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import FactionReference from '../../Faction/Reference';
import Table, { Column, prefixAccessors } from '../../../Table';
import factionColumns from '../../Faction/columns';

const listReputationForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      reputation(offset: $offset) {
        totalCount
        results {
          standing
          faction {
            ...FactionReference
          }
        }
      }
    }
  }

  ${FactionReference.fragment}
`;

const ReputationTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="character.reputation"
      query={listReputationForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
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
