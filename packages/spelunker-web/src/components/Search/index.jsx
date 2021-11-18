import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import {
  Box,
  Button,
  Form,
  Input,
  Query,
  Tab,
  TabbedBox,
  Title,
} from '../core';

import ResultsTab from './ResultsTab';

const search = gql`
  query($searchQuery: String!) {
    accounts(searchQuery: $searchQuery) {
      totalCount
    }
    areas(searchQuery: $searchQuery) {
      totalCount
    }
    characters(searchQuery: $searchQuery) {
      totalCount
    }
    classes(searchQuery: $searchQuery) {
      totalCount
    }
    factions(searchQuery: $searchQuery) {
      totalCount
    }
    objects(searchQuery: $searchQuery) {
      totalCount
    }
    items(searchQuery: $searchQuery) {
      totalCount
    }
    itemSets(searchQuery: $searchQuery) {
      totalCount
    }
    maps(searchQuery: $searchQuery) {
      totalCount
    }
    npcs(searchQuery: $searchQuery) {
      totalCount
    }
    quests(searchQuery: $searchQuery) {
      totalCount
    }
    races(searchQuery: $searchQuery) {
      totalCount
    }
    sides(searchQuery: $searchQuery) {
      totalCount
    }
    spells(searchQuery: $searchQuery) {
      totalCount
    }
  }
`;

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { query: submittedQuery } = params;

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <Title>
      <Box>
        <Form onSubmit={onSubmit}>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button label="Search" />
        </Form>
      </Box>

      {submittedQuery &&
        <Query query={search} variables={{ searchQuery: submittedQuery }}>
          {({ data }) => {
            const {
              accounts: { totalCount: accountCount },
              areas: { totalCount: areaCount },
              characters: { totalCount: characterCount },
              classes: { totalCount: classCount },
              factions: { totalCount: factionCount },
              objects: { totalCount: objectCount },
              items: { totalCount: itemCount },
              itemSets: { totalCount: itemSetCount },
              maps: { totalCount: mapCount },
              npcs: { totalCount: npcCount },
              quests: { totalCount: questCount },
              races: { totalCount: raceCount },
              sides: { totalCount: sideCount },
              spells: { totalCount: spellCount },
            } = data;

            return (
              <TabbedBox>
                {accountCount > 0 && <Tab
                  label={`Accounts (${accountCount})`}
                  component={ResultsTab}
                  path="accounts"
                  columnsFragmentName="accountColumns"
                />}

                {areaCount > 0 && <Tab
                  label={`Areas (${areaCount})`}
                  component={ResultsTab}
                  path="areas"
                  columnsFragmentName="areaColumns"
                />}

                {characterCount > 0 && <Tab
                  label={`Characters (${characterCount})`}
                  component={ResultsTab}
                  path="characters"
                  columnsFragmentName="characterColumns"
                />}

                {classCount > 0 && <Tab
                  label={`Classes (${classCount})`}
                  component={ResultsTab}
                  path="classes"
                  columnsFragmentName="classColumns"
                />}

                {factionCount > 0 && <Tab
                  label={`Factions (${factionCount})`}
                  component={ResultsTab}
                  path="factions"
                  columnsFragmentName="factionColumns"
                />}

                {objectCount > 0 && <Tab
                  label={`Objects (${objectCount})`}
                  component={ResultsTab}
                  path="objects"
                  columnsFragmentName="gameObjectColumns"
                />}

                {itemCount > 0 && <Tab
                  label={`Items (${itemCount})`}
                  component={ResultsTab}
                  path="items"
                  columnsFragmentName="itemColumns"
                />}

                {itemSetCount > 0 && <Tab
                  label={`Item Sets (${itemSetCount})`}
                  component={ResultsTab}
                  path="item-sets"
                  accessor="itemSets"
                  columnsFragmentName="itemSetColumns"
                />}

                {mapCount > 0 && <Tab
                  label={`Maps (${mapCount})`}
                  component={ResultsTab}
                  path="maps"
                  columnsFragmentName="mapColumns"
                />}

                {npcCount > 0 && <Tab
                  label={`NPCs (${npcCount})`}
                  component={ResultsTab}
                  path="npcs"
                  columnsFragmentName="npcColumns"
                />}

                {questCount > 0 && <Tab
                  label={`Quests (${questCount})`}
                  component={ResultsTab}
                  path="quests"
                  columnsFragmentName="questColumns"
                />}

                {raceCount > 0 && <Tab
                  label={`Races (${raceCount})`}
                  component={ResultsTab}
                  path="races"
                  columnsFragmentName="raceColumns"
                />}

                {sideCount > 0 && <Tab
                  label={`Sides (${sideCount})`}
                  component={ResultsTab}
                  path="sides"
                  columnsFragmentName="sideColumns"
                />}

                {spellCount > 0 && <Tab
                  label={`Spells (${spellCount})`}
                  component={ResultsTab}
                  path="spells"
                  columnsFragmentName="spellColumns"
                />}
              </TabbedBox>
            );
          }}
        </Query>}
    </Title>
  );
};

export default Search;
