import React from 'react';
import gql from 'graphql-tag';

import CharacterReference from '../../Character/Reference';
import ClassReference from '../../Class/Reference';
import Collection from '../../../Collection';
import RaceReference from '../../Race/Reference';
import Table from '../../../Table';

const listCharactersForAccount = gql`
  query($id: Int!, $offset: Int) {
    account(id: $id) {
      id
      characters(offset: $offset) {
        totalCount
        results {
          ...CharacterReference
          race {
            ...RaceReference
          }
          class {
            ...ClassReference
          }
          gender
          level
          xp
        }
      }
    }
  }

  ${CharacterReference.fragment}
  ${ClassReference.fragment}
  ${RaceReference.fragment}
`;

const CharactersTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="account.characters"
      query={listCharactersForAccount}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th field="id">#</th>
              <th>Name</th>
              <th>Race</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Level</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {results.map(character => (
              <tr key={character.id}>
                <td field="id">{character.id}</td>
                <td>
                  <CharacterReference character={character} />
                </td>
                <td>
                  <RaceReference race={character.race} />
                </td>
                <td>
                  <ClassReference class={character.class} />
                </td>
                <td>{character.gender}</td>
                <td>{character.level}</td>
                <td>{character.xp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default CharactersTab;
