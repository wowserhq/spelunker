import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import FactionReference from '../../Faction/Reference';
import Table from '../../../Table';

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
      field="character.reputation"
      query={listReputationForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Faction</th>
              <th>Standing</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ faction, standing }) => (
              <tr key={faction.id}>
                <td field="id">{faction.id}</td>
                <td>
                  <FactionReference faction={faction} />
                </td>
                <td>{standing}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default ReputationTab;
