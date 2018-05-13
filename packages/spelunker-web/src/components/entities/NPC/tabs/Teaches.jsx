import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Currency from '../../../formatters/Currency';
import SpellReference from '../../Spell/Reference';
import Table from '../../../Table';

const listTeachesForNPC = gql`
  query($id: Int!, $offset: Int) {
    npc(id: $id) {
      id
      teaches(offset: $offset) {
        totalCount
        results {
          cost
          spell {
            ...SpellReference
          }
        }
      }
    }
  }

  ${SpellReference.fragment}
`;

const TeachesTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="npc.teaches"
      query={listTeachesForNPC}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ cost, spell }) => (
              <tr key={spell.id}>
                <td>{spell.id}</td>
                <td>
                  <SpellReference spell={spell} />
                </td>
                <td>
                  <Currency value={cost} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default TeachesTab;
