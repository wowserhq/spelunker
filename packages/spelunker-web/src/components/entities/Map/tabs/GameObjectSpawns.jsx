import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from '@apollo/client';

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

const GameObjectSpawnsTab = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
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
