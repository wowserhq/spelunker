import React from 'react';
import gql from 'graphql-tag';

import GameObjectReference from '../../GameObject/Reference';
import { Collection, Column, IDColumn, Table } from '../../../core';
import { GameObjectReferenceColumn } from '../../GameObject/columns';

const listObjectSpawnsForMap = gql`
  query($id: Int!, $offset: Int) {
    map(id: $id) {
      id
      objectSpawns(offset: $offset) {
        totalCount
        results {
          id
          x
          y
          z
          object {
            ...GameObjectReference
          }
        }
      }
    }
  }

  ${GameObjectReference.fragment}
`;

const GameObjectSpawnsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="map.objectSpawns"
      query={listObjectSpawnsForMap}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            <IDColumn />,
            <GameObjectReferenceColumn accessor="object" />,
            <Column id="x" label="X" accessor="x" />,
            <Column id="y" label="Y" accessor="y" />,
            <Column id="z" label="Z" accessor="z" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default GameObjectSpawnsTab;
