import React from 'react';
import gql from 'graphql-tag';

import accountColumns from '../entities/Account/columns';
import areaColumns from '../entities/Area/columns';
import characterColumns from '../entities/Character/columns';
import classColumns from '../entities/Class/columns';
import factionColumns from '../entities/Faction/columns';
import gameObjectColumns from '../entities/GameObject/columns';
import itemColumns from '../entities/Item/columns';
import itemSetColumns from '../entities/ItemSet/columns';
import mapColumns from '../entities/Map/columns';
import npcColumns from '../entities/NPC/columns';
import questColumns from '../entities/Quest/columns';
import raceColumns from '../entities/Race/columns';
import sideColumns from '../entities/Side/columns';
import spellColumns from '../entities/Spell/columns';
import { Collection, Table } from '../core';

const columnsLookup = {
  accountColumns,
  areaColumns,
  characterColumns,
  classColumns,
  factionColumns,
  gameObjectColumns,
  itemColumns,
  itemSetColumns,
  mapColumns,
  npcColumns,
  questColumns,
  raceColumns,
  sideColumns,
  spellColumns,
};

const resultsQueryFor = (accessor, { columnsFragmentName, columns }) => (
  gql`
    query($offset: Int, $searchQuery: String) {
      ${accessor}(offset: $offset, searchQuery: $searchQuery) {
        totalCount
        results {
          ...${columnsFragmentName}
        }
      }
    }

    ${columns.fragment}
  `
);

const ResultsTab = (props) => {
  const {
    columnsFragmentName,
    path,
    match: { params: { query: searchQuery } },
    accessor = path,
  } = props;
  const columns = columnsLookup[columnsFragmentName];
  const query = resultsQueryFor(accessor, { columnsFragmentName, columns });
  // TODO: Set proper page title
  return (
    <Collection
      accessor={accessor}
      query={query}
      variables={{ searchQuery }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={columns}
        />
      )}
    </Collection>
  );
};

export default ResultsTab;
