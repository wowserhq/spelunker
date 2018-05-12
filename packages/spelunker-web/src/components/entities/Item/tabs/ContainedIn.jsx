import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import ItemReference from '../../Item/Reference';
import Table from '../../../Table';
import percent from '../../../formatters/percent';

const listContainedInForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      containedIn(offset: $offset) {
        totalCount
        results {
          chance
          container {
            ...ItemReference
          }
        }
      }
    }
  }

  ${ItemReference.fragment}
`;

const ContainedInTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      field="item.containedIn"
      query={listContainedInForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table>
          <thead>
            <tr>
              <th>Chance</th>
              <th>Container</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ chance, container }) => (
              <tr key={container.id}>
                <td>{percent(chance)}</td>
                <td>
                  <ItemReference item={container} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Collection>
  );
};

export default ContainedInTab;
