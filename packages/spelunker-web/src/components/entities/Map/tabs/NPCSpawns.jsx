import React from 'react';
import gql from 'graphql-tag';

import NPCReference from '../../NPC/Reference';
import { Collection, Column, IDColumn, Table } from '../../../core';
import { NPCReferenceColumn } from '../../NPC/columns';

const listNPCSpawnsForMap = gql`
  query($id: Int!, $offset: Int) {
    map(id: $id) {
      id
      npcSpawns(offset: $offset) {
        totalCount
        results {
          id
          x
          y
          z
          npc {
            ...NPCReference
            ends {
              totalCount
            }
            starts {
              totalCount
            }
          }
        }
      }
    }
  }

  ${NPCReference.fragment}
`;

const NPCSpawnsTab = ({ match }) => {
  const id = parseInt(match.params.id, 10);
  return (
    <Collection
      accessor="map.npcSpawns"
      query={listNPCSpawnsForMap}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            <IDColumn />,
            <NPCReferenceColumn accessor="npc" />,
            <Column id="x" label="X" accessor="x" />,
            <Column id="y" label="Y" accessor="y" />,
            <Column id="z" label="Z" accessor="z" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default NPCSpawnsTab;
