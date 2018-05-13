import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import GameObjectReference from '../../GameObject/Reference';
import Table from '../../../Table';
import percent from '../../../formatters/percent';

const listContainedInObjectForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      containedInObject(offset: $offset) {
        totalCount
        results {
          chance
          object {
            ...GameObjectReference
          }
        }
      }
    }
  }

  ${GameObjectReference.fragment}
`;

const ContainedInObjectTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="item.containedInObject"
      query={listContainedInObjectForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Chance</th>
              <th>Object</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ chance, object }) => (
              <tr key={object.id}>
                <td>{percent(chance)}</td>
                <td>
                  <GameObjectReference object={object} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default ContainedInObjectTab;
